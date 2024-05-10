import lessons from "@/data/lessons/lessons";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/* GET /api/courses/count
 * Returns the total number of available courses.
 * @returns {number} totalCourses - The total number of available courses.
 * @security None
 * @example response - 200 - application/json
 */
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
