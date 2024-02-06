import { NextApiRequest, NextApiResponse } from "next";
import lessons from "@/data/lessonsData";

const allowCors =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "https://www.trotelcoin.com");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return handler(req, res);
  };

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const totalCourses = lessons.reduce(
    (acc, curr) => acc + curr.courses.length,
    0
  );

  res.status(200).json({ totalCourses });
}
