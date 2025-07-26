'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Portal Artikel
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            
            {status === 'authenticated' ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <span className="text-blue-200">
                  Halo, {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="hover:text-blue-200"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
