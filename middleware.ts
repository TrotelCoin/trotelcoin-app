import { NextRequest } from "next/server";

let locales = ["en", "fr"];
let defaultLocale = "en";

// we get the default locale
function getLocale() {
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // we check if the pathname contains the locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // if we don't have any locale we redirect
  const locale = getLocale();
  req.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /home
  // the new URL is now /en/home
  return Response.redirect(req.nextUrl);
}

export const config = {
  // do not localize next.js paths
  matcher: [
    "/((?!_next/static|_next/image|manifest.json|mintme.html|favicon.ico|[...nextauth]|sw.js).*)"
  ]
};
