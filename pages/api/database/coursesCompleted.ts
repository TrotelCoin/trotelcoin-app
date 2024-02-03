import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const jsonString = req.body;
    const parsedObject = JSON.parse(jsonString);

    const wallet = parsedObject.wallet;

    // get courses completed by user
    const courses =
    await sql`SELECT quiz_id, answered FROM "quizzes_answered" WHERE wallet = ${wallet} AND answered = true`;

    // return courses
    if (courses) {
    res.status(200).json(courses);
    } else {
    res.status(500).json({ error: "Something went wrong." });
    }
};
