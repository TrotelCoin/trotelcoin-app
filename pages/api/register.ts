import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import Web3 from "web3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { signedMessage, userWalletAddress } = req.body;

    // If verification is successful, create a new user in your Supabase database.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { data, error } = await supabase.from("users").upsert([
      {
        wallet_address: userWalletAddress,
        signed_message: signedMessage,
      },
    ]);

    if (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "User registration failed" });
    }

    return res.status(200).json({ message: "User registered successfully" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
