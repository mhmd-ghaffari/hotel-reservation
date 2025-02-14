"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button
        className="md:hidden p-3 absolute top-10 left-4 z-50 bg-primary-900 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Navigation Menu */}
      <nav
        className={`fixed inset-y-0 left-0 bg-primary-800 md:bg-transparent  p-5 text-white w-64 z-40 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full "
        } md:translate-x-0 md:relative md:w-auto md:border-r md:border-primary-900`}
      >
        <ul className="flex flex-col gap-2 h-full text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-700 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold ${
                  pathname === link.href ? "bg-primary-900" : ""
                }`}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideNavigation;
