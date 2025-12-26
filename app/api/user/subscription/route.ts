import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId, has } = await auth();

    if (!userId) {
      return NextResponse.json(
        { hasPremium: false, plan: null },
        { status: 401 }
      );
    }

    const user = await currentUser();

    // Check using Clerk's has() method for "unlimited" plan
    const hasUnlimitedPlan = has ? has({ plan: "unlimited" }) : false;

    // Fallback to publicMetadata if billing not set up
    const planFromMetadata = user?.publicMetadata?.plan as string;
    const hasPremium = hasUnlimitedPlan || planFromMetadata === "unlimited";

    return NextResponse.json({
      hasPremium,
      plan: hasPremium ? "unlimited" : planFromMetadata || null,
    });
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json(
      { hasPremium: false, plan: null },
      { status: 500 }
    );
  }
}
