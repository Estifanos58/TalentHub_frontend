'use client';

import { useUserStore } from '@/state/data';
import { useRouter } from 'next/navigation';
import React from 'react';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { deleteJob } from '@/actions/deleteJob';

function JobTable({ jobs, yourJob }: { jobs: any[]; yourJob?: boolean }) {
  const router = useRouter();
  const { user } = useUserStore();

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      toast.success('Job Deleted');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Deletion Error Occurred'
      );
    }
  };

  const handleView = (jobId: string) => {
    if (yourJob) {
      router.push(`/employer/jobs/${jobId}/applications`);
    } else {
      router.push(`/jobs/${jobId}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 text-xs md:text-sm lg:text-base">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
              Title
            </th>
            <th className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
              Type
            </th>
            <th className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
              Site
            </th>
            <th className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
              Experience
            </th>
            <th className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job: any) => {
            const canManage = user?.role === 'admin' || user?._id === job.createdBy;
            const isCreator = user?._id === job.createdBy;

            return (
              <tr
                key={job._id}
                className="hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-900"
              >
                <td className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  {job.title}
                </td>
                <td className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  {job.type}
                </td>
                <td className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  {job.site}
                </td>
                <td className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  {job.experience}
                </td>
                <td className="px-2 md:px-4 py-2 border-b border-gray-300 dark:border-gray-700 flex space-x-2">
                  {/* Show View if NOT creator OR if yourJob is true */}
                  {(!isCreator || yourJob) && (
                    <button
                      onClick={() => handleView(job._id)}
                      className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                      title="View"
                    >
                      <EyeIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  )}

                  {/* Show Delete if creator or admin */}
                  {canManage && (
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
