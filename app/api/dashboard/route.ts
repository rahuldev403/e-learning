import { db } from "@/app/config/db";
import {
  usersTable,
  EnrolledCourseTable,
  CourseTable,
  CourseChapterTable,
  UserProgressTable,
} from "@/app/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and, sql } from "drizzle-orm";

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress;

    // Get user data
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    if (userData.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;

    // Get enrolled courses with course details
    const enrolledCourses = await db
      .select({
        id: EnrolledCourseTable.id,
        courseId: EnrolledCourseTable.courseId,
        enrolledDate: EnrolledCourseTable.enrolledDate,
        progress: EnrolledCourseTable.progress,
        title: CourseTable.title,
        description: CourseTable.description,
        bannerImage: CourseTable.bannerImage,
        level: CourseTable.level,
        tags: CourseTable.tags,
      })
      .from(EnrolledCourseTable)
      .leftJoin(
        CourseTable,
        eq(EnrolledCourseTable.courseId, CourseTable.courseId)
      )
      .where(eq(EnrolledCourseTable.userId, userId));

    // Get chapter counts for each enrolled course
    const coursesWithChapters = await Promise.all(
      enrolledCourses.map(async (course) => {
        const chapters = await db
          .select()
          .from(CourseChapterTable)
          .where(eq(CourseChapterTable.courseId, course.courseId));

        return {
          ...course,
          totalChapters: chapters.length,
          completedChapters: course.progress || 0,
        };
      })
    );

    // Calculate stats
    const totalEnrolled = enrolledCourses.length;
    const totalCompleted = enrolledCourses.filter(
      (course) => course.progress === 100
    ).length;

    // Get total completed chapters across all courses
    const completedChapters = enrolledCourses.reduce(
      (sum, course) => sum + (course.progress || 0),
      0
    );

    // Estimate hours (assume 2 hours per chapter)
    const hoursLearned = completedChapters * 2;

    const stats = {
      coursesEnrolled: totalEnrolled,
      projectsCompleted: completedChapters, // Using completed chapters as projects
      certificatesEarned: totalCompleted,
      hoursLearned: hoursLearned,
    };

    return NextResponse.json({
      user: userData[0],
      enrolledCourses: coursesWithChapters,
      stats,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
};
