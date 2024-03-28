import { NextRequest } from "next/server";
let locales = ["en", "fr"];
let defaultLocale = "en";

// Get the preferred locale, similar to the above or using a library
function getLocale() {
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale();
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  // do not localize next.js paths
  matcher: [
    "/((?!api|_next/static|_next/image|assets|audio|sounds|manifest.json|mintme.html|public|favicon.ico|[...nextauth]|sw.js).*)",
  ],
};
