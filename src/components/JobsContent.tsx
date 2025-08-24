import Filter from "./Filter";
import JobTable from "./JobTable";
import Pagination from "./Pagination";

const JobsContent = async({jobs, count, currentPage}: {jobs:any, count: number, currentPage: number}) =>{
    const hasJobs = jobs.length > 0;
    return (
           <div className="min-h-screen bg-background dark:bg-background-dark text-primary dark:text-primary-dark px-4 py-10">
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
    )
}

export default JobsContent;