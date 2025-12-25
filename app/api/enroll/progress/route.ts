import { db } from "@/app/config/db";
import { EnrolledCourseTable } from "@/app/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { courseId, progress } = await req.json();

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!courseId || typeof courseId !== "string") {
    return NextResponse.json(
      { error: "Course ID is required" },
      { status: 400 }
    );
  }

  if (typeof progress !== "number" || Number.isNaN(progress)) {
    return NextResponse.json(
      { error: "Progress must be a number" },
      { status: 400 }
    );
  }

  const safeProgress = Math.max(0, Math.floor(progress));

  try {
    const existing = await db
      .select()
      .from(EnrolledCourseTable)
      .where(
        and(
          eq(EnrolledCourseTable.courseId, courseId),
          eq(EnrolledCourseTable.userId, user.id)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "You are not enrolled in this course" },
        { status: 404 }
      );
    }

    const previous = existing[0];
    const nextProgress = Math.max(previous.progress, safeProgress);

    if (nextProgress === previous.progress) {
      return NextResponse.json(previous);
    }

    const updated = await db
      .update(EnrolledCourseTable)
      .set({ progress: nextProgress })
      .where(
        and(
          eq(EnrolledCourseTable.courseId, courseId),
          eq(EnrolledCourseTable.userId, user.id)
        )
      )
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Update progress error", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
};
