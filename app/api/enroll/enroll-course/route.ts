import { db } from "@/app/config/db";
import { EnrolledCourseTable } from "@/app/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  const { courseId } = await req.json();

  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  if (!courseId || typeof courseId !== "string") {
    return NextResponse.json(
      { error: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    const exists = await db
      .select({ id: EnrolledCourseTable.id })
      .from(EnrolledCourseTable)
      .where(
        and(
          eq(EnrolledCourseTable.courseId, courseId),
          eq(EnrolledCourseTable.userId, user.id)
        )
      );

    if (exists.length) {
      return NextResponse.json(
        { error: "You are already enrolled in this course." },
        { status: 409 }
      );
    }

    const result = await db
      .insert(EnrolledCourseTable)
      .values({
        courseId,
        userId: user.id,
        progress: 0,
        enrolledDate: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json({
      result: result[0],
    });
  } catch (error) {
    console.error("Enroll course error", error);
    const message =
      error instanceof Error ? error.message : "Failed to enroll course";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
