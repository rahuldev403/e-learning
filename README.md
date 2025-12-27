# E-Learning Platform

A modern, gamified learning platform built with Next.js featuring interactive coding challenges, progress tracking, and premium subscriptions.

## Features

- 🎮 **Gamified Learning** - Pixel-art themed UI with activity heatmaps and progress tracking
- 💻 **Interactive Code Editor** - Built-in Monaco editor for hands-on coding practice
- 📚 **Course Management** - Structured courses with chapters and exercises
- ⭐ **Premium Access** - Free tier (4 chapters) with unlimited premium subscription
- 📊 **Progress Tracking** - Track completed exercises and course completion
- 🌙 **Dark Mode** - Full dark mode support
- 📧 **Invite Friends** - Email invitations with beautiful templates

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Authentication:** Clerk
- **Database:** Neon PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Email:** Nodemailer

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=


# SMTP (for email invitations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```



3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## License

MIT
