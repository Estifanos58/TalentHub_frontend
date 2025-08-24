"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useUserStore } from "@/state/data";
import { getUser } from "@/actions/getUser";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logOut } from "@/actions/logOut";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu toggle
  const { user, addUser, removeUser } = useUserStore();
  const router = useRouter()

useEffect(() => {
  async function fetchUser() {
    try {
      setLoading(true);
      const response = await getUser();
      console.log("Fetched Response:", response);

      if (response.success && response.data) {
        addUser(response.data);
      } else {
        removeUser(); // ensures we clear stale user
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      removeUser();
    } finally {
      setLoading(false);
    }
  }
  fetchUser();
}, [addUser, removeUser]);



  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // console.log("Current User:", user);

  const navLinks = [
    { name: "Home", href: "/", permission: "all" },
    { name: "About Us", href: "/about", permission: "all" },
    { name: "Contact Me", href: "https://www.estifanos.tech", permission: "all" },
    { name: "Create A Job", href: "/jobs/create", permission: ["employer", "admin"] },
    { name: "Applications", href: "/applications", permission: ["applicant"] },
    { name: "Admin", href: "/admin", permission: "admin" },
    { name: "Your Jobs", href: "/employer/jobs", permission: ["employer", "admin"] },
  ];

  // Filter links based on user role
  const filteredLinks = navLinks.filter((link) => {
    if (link.permission === "all") return true;
    if (!user) return false;
    if (Array.isArray(link.permission)) return link.permission.includes(user.role);
    return user.role === link.permission;
  });

  const handelLogOut = async () => {
    try {
      await logOut()
      removeUser();
      router.push('/')
      toast.success('Logged out successfully');
      setMobileOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {filteredLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary dark:text-primary-dark hover:text-secondary dark:hover:text-secondary-dark font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Buttons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {loading ? (
              <span className="text-gray-500">Loading...</span>
            ) : user?.username ? (
              <>
                <span className="text-primary dark:text-primary-dark font-medium">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={handelLogOut}
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

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {filteredLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary dark:text-primary-dark font-medium py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
