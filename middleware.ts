import { NextRequest } from "next/server";
import dotenv from "dotenv";
import { getServerSession } from "next-auth";

dotenv.config();

const TROTELCOIN_BEARER_TOKEN = process.env.TROTELCOIN_BEARER_TOKEN as string;

// authentication with nextauth.js
const isAuthenticated = async (req) => {
  const session = await getServerSession();

  return !!session; // if the session exists, the user is authenticated
};

let locales = ["en", "fr"];
let defaultLocale = "en";

// we get the default locale
function getLocale() {
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  // we check if the pathname contains the locale
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathname.startsWith("/api")) {
  }

  if (pathname.startsWith("/api/auth")) {
    if (!isAuthenticated(request)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  if (pathnameHasLocale) return;

  // if we don't have any locale we redirect
  const locale = getLocale();
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /home
  // the new URL is now /en/home
  return Response.redirect(request.nextUrl);
}

export const config = {
  // do not localize next.js paths
  matcher: [
    "/((?!_next/static|_next/image|assets|audio|sounds|manifest.json|mintme.html|public|favicon.ico|[...nextauth]|sw.js).*)"
  ]
};
