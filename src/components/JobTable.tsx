'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

function JobTable({jobs}: {jobs: any[]}) {
  const router = useRouter();
  return (
     <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Title</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Type</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Site</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">Experience</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job: any) => (
              <tr key={job._id} className="hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-900">
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  <Link href={`/jobs/${job._id}`}>{job.title}</Link>
                  </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{job.type}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{job.site}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{job.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default JobTable
