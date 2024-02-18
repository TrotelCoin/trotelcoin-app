import lessons from "@/data/lessonsData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const totalCourses = lessons.reduce(
    (acc, curr) => acc + curr.courses.length,
    0
  );

  return NextResponse.json(totalCourses, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://www.trotelcoin.com",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
