import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

declare module "next" {
  interface NextApiRequest {
    user?: any;
  }
}

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const verifyToken =
  (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.TROTELCOIN_JWT_SECRET);
      req.user = decoded;
      return await handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };

const handler: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const trotelSecret = process.env.TROTELCOIN_SECRET as string;

  if (!trotelSecret) {
    return res.status(404).json({ message: "Secret not found" });
  }

  return res.status(200).json(trotelSecret);
};

export default verifyToken(handler);
