// import Filter from "@/components/Filter";
// import JobTable from "@/components/JobTable";
// import Pagination from "@/components/Pagination";
import { getJobs } from "@/actions/getJobs";
import { Suspense } from "react";
import JobsContent from "@/components/JobsContent";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Server-side data fetching based on URL searchParams
  const response = await getJobs(searchParams);

  const initialData = response.data || {};
  
  const jobs = initialData.jobs || [];
  const count: number = initialData.count || 0;
  const currentPage: number = initialData.currentPage
    ? parseInt(initialData.currentPage)
    : 1;

  // Check if any jobs were found
  const hasJobs = jobs.length > 0;

  return (
  <Suspense>
    <JobsContent jobs={jobs} count={count} currentPage={currentPage} />
  </Suspense>  
  );
}