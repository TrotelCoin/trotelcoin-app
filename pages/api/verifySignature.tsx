import React from "react";

export default async function handler(
  req: { method: string; body: { signature: any; account: any; message: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { error?: string; isVerified?: boolean }): any;
        new (): any;
      };
    };
  }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { signature, account, message } = req.body;

  // Verification mechanism
  const ethers = require("ethers");
  const wallet = new ethers.Wallet(process.env.YOUR_PRIVATE_KEY);
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);

  if (recoveredAddress === account && wallet.address === account) {
    // Signature is verified and matches the user's account
    return res.status(200).json({ isVerified: true });
  } else {
    // Signature verification failed
    return res.status(401).json({ isVerified: false });
  }
}
