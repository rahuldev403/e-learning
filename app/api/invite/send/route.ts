import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = await req.json();

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Create transporter with your SMTP credentials
    // You'll need to set these environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const senderName = user.firstName || user.username || "A friend";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Beautiful pixelated email template
    const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join Us!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            font-family: 'Press Start 2P', cursive;
            background-color: #1a1a2e;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
        }
        .content {
            background-color: #ffffff;
            border: 8px solid #000000;
            padding: 30px;
            box-shadow: 8px 8px 0px #000000;
            image-rendering: pixelated;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .pixel-title {
            font-size: 24px;
            color: #000000;
            text-shadow: 4px 4px 0px #667eea;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .pixel-box {
            background-color: #f0f0f0;
            border: 4px solid #000000;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .message {
            font-size: 12px;
            line-height: 2;
            color: #333333;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #667eea;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 30px;
            border: 4px solid #000000;
            font-size: 14px;
            box-shadow: 4px 4px 0px #000000;
            transition: all 0.1s;
            margin: 20px 0;
        }
        .button:hover {
            box-shadow: 2px 2px 0px #000000;
            transform: translate(2px, 2px);
        }
        .features {
            margin: 30px 0;
        }
        .feature-item {
            background-color: #f8f8f8;
            border: 3px solid #000000;
            padding: 15px;
            margin: 10px 0;
            display: flex;
            align-items: center;
        }
        .feature-icon {
            width: 40px;
            height: 40px;
            background-color: #667eea;
            border: 3px solid #000000;
            display: inline-block;
            margin-right: 15px;
            image-rendering: pixelated;
        }
        .feature-text {
            font-size: 10px;
            line-height: 1.8;
            color: #333333;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 8px;
            color: #666666;
            line-height: 2;
        }
        .emoji {
            font-family: Arial, sans-serif;
            font-size: 40px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="header">
                <div class="emoji">🎮</div>
                <h1 class="pixel-title">LEVEL UP YOUR SKILLS!</h1>
            </div>
            
            <div class="pixel-box">
                <p class="message">
                    <strong>${senderName}</strong> invited you to join our amazing learning platform!
                </p>
            </div>
            
            <p class="message">
                Hey there! 👋<br><br>
                
                Your friend thinks you'd love our platform where learning meets gaming! 
                Join thousands of developers leveling up their coding skills.
            </p>
            
            <div class="features">
                <div class="feature-item">
                    <div class="feature-icon"></div>
                    <div class="feature-text">
                        <strong>INTERACTIVE COURSES</strong><br>
                        Learn by doing with hands-on projects
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon"></div>
                    <div class="feature-text">
                        <strong>TRACK PROGRESS</strong><br>
                        Watch your skills grow daily
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon"></div>
                    <div class="feature-text">
                        <strong>JOIN COMMUNITY</strong><br>
                        Connect with fellow learners
                    </div>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="${appUrl}" class="button">START YOUR JOURNEY!</a>
            </div>
            
            <div class="pixel-box" style="margin-top: 30px;">
                <p class="message">
                    🎯 Ready to code like a pro?<br>
                    🚀 Let's start this adventure!
                </p>
            </div>
            
            <div class="footer">
                <p>
                    This invitation was sent by ${senderName}<br>
                    If you don't want to receive these emails, you can ignore this message.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "E-Learning Platform"}" <${
        process.env.SMTP_USER
      }>`,
      to: email,
      subject: `${senderName} invited you to join our learning platform! 🎮`,
      html: emailTemplate,
      text: `${senderName} invited you to join our amazing learning platform! Visit ${appUrl} to start your coding journey.`,
    });

    return NextResponse.json(
      { message: "Invitation sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending invite:", error);
    return NextResponse.json(
      { error: "Failed to send invitation. Please try again later." },
      { status: 500 }
    );
  }
}
