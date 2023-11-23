import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ms'],
 
  // Used when no locale matches
  defaultLocale: 'ms'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ms|en)/:path*']
};