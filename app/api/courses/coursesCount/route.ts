import lessons from "@/data/lessonsData";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const allowCors =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "https://www.trotelcoin.com");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return handler(req, res);
  };

export async function POST(req: NextRequest, res: NextResponse) {
  const totalCourses = lessons.reduce(
    (acc, curr) => acc + curr.courses.length,
    0
  );

  return NextResponse.json(totalCourses, { status: 200 });
}
