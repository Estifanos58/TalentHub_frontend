"use client";

import Link from "next/link";

type Application = {
  _id: string;
  jobId: { title: string };
  status: "applied" | "shortlisted" | "rejected";
};

export default function ApplicationTable({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <div className="overflow-x-auto flex flex-col items-center ">
      <table className="w-[700px] text-left border-collapse rounded-lg shadow-md bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <th className="px-6 py-3 border-b">Job Title</th>
            <th className="px-6 py-3 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Link href={`applications/${app._id}`}>
                <td className="px-6 py-4 border-b font-medium">
                  {app.jobId.title}
                </td>
              </Link>
              <td className="px-6 py-4 border-b">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "applied"
                      ? "bg-blue-100 text-blue-700"
                      : app.status === "shortlisted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
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
  );
}
