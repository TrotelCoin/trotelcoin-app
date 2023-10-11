import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers/index";
import { MoralisNextAuthProvider } from "@moralisweb3/next";
import ConnectDB from "@/lib/connectDB";
import Users from "@/lib/userSchema";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        message: { labe: "Message", type: "text", placeholder: "0x0" },
        signature: { label: "Signature", type: "text", placeholder: "0x0" },
      },
      async authorize(credentials) {
        try {
          const { message, signature } = credentials;

          await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

          const { address, profileId, expirationTime } =
            await Moralis.Auth.verify({ message, signature, network: "evm" });

          const user = { address, profileId, expirationTime, signature };

          await connectDB();
          const MongoUser = await Users.findOne({ profileId: profileId });

          if (!MongoUser) {
            const newUser = new Users({ profileId: profileId });
            await newUser.save();
          }

          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
