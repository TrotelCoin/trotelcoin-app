import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { Web3Storage } from "web3.storage";

const web3Storage = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY });

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message ?? "{}")
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string);

          const result = await siwe.verify({
            signature: credentials?.signature ?? "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            const userData = {
              id: siwe.address,
              wallet: siwe.address,
              numberOfQuizzesAnswered: 0,
              numberOfQuizzesCreated: 0,
              totalRewards: 0,
              totalRewardsClaimed: 0,
              totalRewardsPending: 0,
            };

            const cid = await web3Storage.put({
              path: '/user-info.json',
              content: new TextEncoder().encode(JSON.stringify(userData)),
            });

            return {
              id: siwe.address,
              web3_storage_cid: cid,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }: { token: any; user: any }) {
        if (user) {
          token.web3_storage_cid = user.web3_storage_cid;
        }
        return token;
      },
      async session({ session, token }: { session: any; token: any }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.web3_storage_cid = token.web3_storage_cid;
        return session;
      },
    },
  });
}
