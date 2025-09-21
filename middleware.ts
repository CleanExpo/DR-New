// MINIMAL MIDDLEWARE - NO AUTHENTICATION
export function middleware() {
  // Do nothing - allow all requests through
  return;
}

export const config = {
  matcher: []  // Don't match anything - disable middleware completely
};