import { NextApiRequest, NextApiResponse } from "next";
import lessons from "@/data/lessonsData";

const allowCors =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "https://trotelcoin.com");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return handler(req, res);
  };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const totalCourses = lessons.reduce(
      (acc, curr) => acc + curr.courses.length,
      0
    );

    res.status(200).json({ totalCourses });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default allowCors(handler);
