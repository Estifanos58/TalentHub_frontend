"use client";

import ApplicationForm from "@/components/ApplicationForm";
import { useUserStore } from "@/state/data";
import Link from "next/link";

export default function JobApplicationSection({ jobId }: { jobId: string }) {
  const { user } = useUserStore(); 
  // console.log("Current user:", user);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 font-medium">You need an account to apply</p>
        <div className="flex gap-3">
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
        </div>
      </div>
    );
  }

  return <ApplicationForm jobId={jobId} />;
}
