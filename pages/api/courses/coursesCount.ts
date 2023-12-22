import { NextApiRequest, NextApiResponse } from "next";
import lessons from "@/data/lessonsData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const totalCourses = lessons.reduce(
      (acc, curr) => acc + curr.courses.length,
      0
    );

    res.status(200).json({ totalCourses });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
