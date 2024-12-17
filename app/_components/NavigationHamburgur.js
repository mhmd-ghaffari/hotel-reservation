"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="z-10 text-xl">
      {/* Hamburger menu for small screens */}
      <div className="md:hidden flex justify-between items-center p-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation links */}
      <ul
        className={`${
          isMenuOpen
            ? "max-h-[500px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        } overflow-hidden w-full md:max-h-[500px] md:opacity-100 md:translate-y-0 md:flex md:relative absolute right-0 bg-primary-900 md:bg-transparent flex-col md:flex-row gap-4 md:gap-16 items-center p-6  md:p-0 shadow md:shadow-none transition-all duration-500 ease-in-out transform`}
      >
        <li className="mb-4 md:mb-0">
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li className="mb-4 md:mb-0">
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li className="mb-4 md:mb-0">
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
