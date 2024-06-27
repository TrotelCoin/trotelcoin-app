import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const isAuthenticated = async (req: NextRequest) => {
  const session = await getServerSession();
  return !!session; // check if user is authenticated
};
