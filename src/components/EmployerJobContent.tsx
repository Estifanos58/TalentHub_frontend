"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import JobTable from "@/components/JobTable";
import Pagination from "@/components/Pagination";
import { getJobs } from "@/actions/getJobs";
import { useUserStore } from "@/state/data";

const EmployerJobContent = ({userId}:{userId: string}) => {
  const searchParams = useSearchParams();
  const [jobsData, setJobsData] = useState<{ jobs: any[]; count: number; currentPage: number }>({
    jobs: [],
    count: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        // Convert searchParams to a plain object safely
        const params: { [key: string]: string } = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
        // console.log('Fetching jobs with params:', user);
        const response = await getJobs(params, true, userId);
        // console.log('Fetched jobs response:', response);
        if (response.success) {
          setJobsData(response.data || { jobs: [], count: 0, currentPage: 1 });
        } else {
          console.error("Failed to fetch jobs:", response.message);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [searchParams.toString()]); // add dependency on stringified searchParams

  const { jobs, count, currentPage } = jobsData;

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-primary dark:text-primary-dark px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Available Jobs</h1>

      <div className="flex mx-6 flex-col md:flex-row gap-2">
        <div className="md:w-1/4">
          <Filter />
        </div>

        <div className="md:w-3/4 flex flex-col gap-2">
          {loading ? (
            <p className="text-center">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <>
              <JobTable jobs={jobs} yourJob={true} />
              <Pagination count={count} currentPage={currentPage} />
            </>
          ) : (
            <div className="p-8 text-center text-lg text-gray-500 dark:text-gray-400 rounded-md bg-white dark:bg-gray-800 shadow-md">
              No jobs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerJobContent;