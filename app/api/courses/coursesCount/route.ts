import lessons from "@/data/lessons/lessonsData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const availableCourses = lessons.flatMap((lesson) =>
    lesson.courses.filter((course) => course.available)
  );

  const totalCourses = availableCourses.length;

  return NextResponse.json(totalCourses, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
    },
  });
}
