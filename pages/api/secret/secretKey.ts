import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

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
  const secretKey = process.env.TROTELCOIN_SECRET_ENCRYPTION_KEY;
  if (secretKey) {
    res.status(200).json({ secretKey });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyToken(handler);
