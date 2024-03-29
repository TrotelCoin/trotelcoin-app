import lessons from "@/data/lessons/lessonsData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const totalCourses = lessons
    .filter((lesson) => lesson.courses.every((course) => course.available))
    .reduce((acc, curr) => acc + curr.courses.length, 0);

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
