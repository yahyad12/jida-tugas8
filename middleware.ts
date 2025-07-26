import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Optional: Add additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*']
}
