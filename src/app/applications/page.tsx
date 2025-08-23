
import Pagination from "@/components/Pagination";
import ApplicationTable from "@/components/ApplicationTable";
import { getApplications } from "@/actions/getApplications";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) { 

  // Fetch applications (server-side)
  const initialData = await getApplications(searchParams);

  // console.log("Initial Data:", initialData);

  const applications = initialData.applications || [];
  const count: number = initialData.count || 0;
  const currentPage: number = initialData.currentPage
    ? parseInt(initialData.currentPage)
    : 1;

  const hasApplications = applications.length > 0;

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-primary dark:text-primary-dark px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-dark">
        My Job Applications
      </h1>

      <div className="mx-6 flex flex-col gap-4">
        {hasApplications ? (
          <>
            <ApplicationTable applications={applications} />
            <Pagination count={count} currentPage={currentPage} />
          </>
        ) : (
          <div className="p-8 text-center text-lg font-medium text-gray-500 dark:text-gray-400 rounded-md bg-white dark:bg-gray-800 shadow-md">
            You haven’t applied to any jobs yet.
          </div>
        )}
      </div>
    </div>
  );
}
