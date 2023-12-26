import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const encryptionAlgorithm = "aes-256-gcm";
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const trotelSecret = process.env.TROTELCOIN_SECRET as string;

  if (!trotelSecret) {
    return res.status(404).json({ message: "Secret not found" });
  }

  const cipher = crypto.createCipheriv(encryptionAlgorithm, secretKey, iv);
  let encryptedSecret = cipher.update(trotelSecret, "utf8", "hex");
  encryptedSecret += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return res.status(200).json({
    encryptedSecret,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  });
}
