import NextAuth from "next-auth";
import { MoralisNextAuthProvider } from "@moralisweb3/next";
import ConnectDB from "@/lib/connectDB";
import Users from "@/lib/userSchema";

export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      (session as { user: unknown }).user = token.user;
      return session;
    },
  },
});
