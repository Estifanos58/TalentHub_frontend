import Pagination from "@/components/Pagination";
import ApplicationTable from "@/components/ApplicationTable";
import { getApplications } from "@/actions/getApplications";

interface ApplicationsPageProps {
  params: { id: string }; 
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ApplicationsPage({ params, searchParams }: ApplicationsPageProps) {
  const { id } = params;

  // Fetch applications for this job
  const initialData = await getApplications({ searchParams: searchParams, jobId:id });

  // console.log("Job ID from params:", id);
  const applications = initialData.applications || [];
  const count: number = initialData.count || 0;
  const currentPage: number = initialData.currentPage
    ? parseInt(initialData.currentPage)
    : 1;

  const hasApplications = applications.length > 0;



  return (

    <div className="min-h-screen bg-background dark:bg-background-dark text-primary dark:text-primary-dark px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-4 text-center">
          {`Applications for Your Job`}
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Review and manage all applications submitted to this job posting.
        </p>

        {/* Applications */}
        {hasApplications ? (
          <div className="space-y-6">
            <ApplicationTable applications={applications} yourJob={true} />
            <Pagination count={count} currentPage={currentPage} />
          </div>
        ) : (
          <div className="p-8 text-center text-lg font-medium text-gray-500 dark:text-gray-400 rounded-md bg-white dark:bg-gray-800 shadow-md">
            No applications have been submitted for this job yet.
          </div>
        )}
      </div>
    </div>
  );
}
