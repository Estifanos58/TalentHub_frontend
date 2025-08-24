import { getJobById } from "@/actions/getJobById";
import JobApplicationSection from "@/components/JobApplicationSection";
import JobDetailCard from "@/components/JobDetail";
import { toast } from "react-toastify";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let job = null;
  try {
    const response = await getJobById(params.id); 
    if(!response.success){
      toast.error(response.message);
    }
    job = response.data;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-primary dark:text-primary-dark px-4 py-10">
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        {/* Left: Application Form */}
        <div className="md:w-1/3 max-h-[400px]  bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          <JobApplicationSection jobId={params.id} />
        </div>

        {/* Right: Job Details */}
        <div className="md:w-2/3">
          <JobDetailCard job={job.job} />
        </div>
      </div>
    </div>
  );
}
