"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useUserStore } from "@/state/data";
import { getUser } from "@/actions/getUser";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const { user, addUser, removeUser } = useUserStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const fetchedUser = await getUser(); // must return user or null
        if (fetchedUser) {
          addUser(fetchedUser);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [addUser]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Me", href: "https://www.estifanos.tech" },
    { name: "Create A Job", href: "jobs/create" },
    { name: "Applications", href: "/applications" },
  ];

  return (
    <nav className="bg-background dark:bg-background-dark shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-primary dark:text-primary-dark hover:text-secondary dark:hover:text-secondary-dark transition-colors"
            >
              TalentHub
            </Link>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary dark:text-primary-dark hover:text-secondary dark:hover:text-secondary-dark font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {loading ? (
              <span className="text-gray-500">Loading...</span> // ✅ Loading indicator
            ) : user ? (
              <>
                <span className="text-primary dark:text-primary-dark font-medium">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={removeUser}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-md hover:bg-secondary dark:hover:bg-secondary-dark transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-primary dark:border-primary-dark text-primary dark:text-primary-dark rounded-md hover:bg-secondary dark:hover:bg-secondary-dark hover:text-white transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
