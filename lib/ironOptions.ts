import type { IronSessionOptions } from "iron-session";

export const ironOptions: IronSessionOptions = {
  password: process.env.NEXT_PUBLIC_VERCEL_ENV_SECRET_COOKIE_PASSWORD as string,
  cookieName: "siwe",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
