import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient({ host: 'localhost', port: 5001, protocol: 'http' });

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

            const cid = await ipfs.add(JSON.stringify(userData));

            return {
              id: siwe.address,
              ipfs_cid : cid.toString(),
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
      async jwt({token, user}: {token: any, user: any}) {
        if (user) {
          token.ipfs_cid = user.ipfs_cid;
        }
        return token;
      },
      async session({ session, token }: { session: any; token: any }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.ipfs_cid = token.ipfs_cid;
        return session;
      },
    },
  });
}
