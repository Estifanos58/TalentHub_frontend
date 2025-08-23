import Filter from "@/components/Filter";
import JobTable from "@/components/JobTable";
import Pagination from "@/components/Pagination";
import { getJobs } from "@/actions/getJobs";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Server-side data fetching based on URL searchParams
  const initialData = await getJobs(searchParams);

  const jobs = initialData.jobs || [];
  const count: number = initialData.count || 0;
  const currentPage: number = initialData.currentPage
    ? parseInt(initialData.currentPage)
    : 1;

  // Check if any jobs were found
  const hasJobs = jobs.length > 0;

  return (
    <div className="min-h-sc bg-background dark:bg-background-dark text-primary dark:text-primary-dark px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-dark">
        Available Jobs
      </h1>

      {/* Main Flex Container */}
      <div className="flex mx-6 flex-col md:flex-row gap-2">
        {/* Filter Sidebar */}
        <div className="md:w-1/4">
          <Filter />
        </div>

        {/* Table + Pagination */}
        <div className="md:w-3/4 flex flex-col gap-2">
          {/* Conditional Rendering: Show table or a "no jobs found" message */}
          {hasJobs ? (
            <>
              <JobTable jobs={jobs} />
              <Pagination count={count} currentPage={currentPage} />
            </>
          ) : (
            <div className="p-8 text-center text-lg font-medium text-gray-500 dark:text-gray-400 rounded-md bg-white dark:bg-gray-800 shadow-md">
              No jobs found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}