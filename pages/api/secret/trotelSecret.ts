import { NextApiRequest, NextApiResponse } from "next";

const SERVER_SECRET_TOKEN = process.env.SERVER_SECRET_TOKEN;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestSecretToken = req.headers["x-server-secret-token"];

  if (requestSecretToken === SERVER_SECRET_TOKEN) {
    const secret = process.env.TROTELCOIN_SECRET;
    if (!secret) {
      res.status(500).json({
        message: "Le secret n'a pas été défini.",
      });
    }
    res.status(200).json({ secret });
  } else {
    res.status(403).json({
      message: "Accès non autorisé.",
    });
  }
}
