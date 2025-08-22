import Link from "next/link";

export default function Footer() {

  return (
    <footer className="bg-background dark:bg-background-dark text-primary dark:text-primary-dark border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold text-primary dark:text-primary-dark">
          <Link href="/">TalentHub</Link>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} TalentHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
