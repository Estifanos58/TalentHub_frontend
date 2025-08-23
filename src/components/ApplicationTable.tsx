"use client";

import Link from "next/link";

type Application = {
  _id: string;
  jobId: { title: string };
  status: "applied" | "shortlisted" | "rejected";
  userId?: { username: string; email: string }; // Added email
};

export default function ApplicationTable({
  applications,
  yourJob,
}: {
  applications: Application[];
  yourJob?: boolean;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Job Title
              </th>
              {yourJob && (
                <>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Applied By
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Email
                  </th>
                </>
              )}
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, idx) => (
              <tr
                key={app._id}
                className={`transition-colors ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  <Link
                    href={`/applications/${app._id}`}
                    className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {app.jobId.title}
                  </Link>
                </td>

                {yourJob && (
                  <>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {app.userId?.username || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {app.userId?.email || "N/A"}
                    </td>
                  </>
                )}

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
                      app.status === "applied"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : app.status === "shortlisted"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
