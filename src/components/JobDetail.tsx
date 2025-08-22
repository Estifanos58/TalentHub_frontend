export default function JobDetailCard({ job }: { job: any }) {
    console.log("Job in JobDetailCard:", job);
    const deadline = new Date(job.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const noOfApplicantsLeft = job.applicantsNeeded - job.noOfApplicants;
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-col gap-4">
      {/* Title + Sector */}
      <div>
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-500">{job.sector}</p>
        <p className="text-sm text-gray-400">{job.location}</p>
      </div>

      <hr />

      {/* Job Info */}
      <div className="flex flex-col gap-2 text-sm">
        <p>
          <span className="font-semibold">Job Type:</span> {job.site} – {job.type}
        </p>
        <p>
          <span className="font-semibold">Deadline:</span> {job.deadline}
        </p>
        <p>
          <span className="font-semibold">Applicants Needed:</span> {job.applicantsNeeded}
        </p>
        <p>
          <span className="font-semibold">No of Applicants:</span> {job.noOfApplicants}
        </p>
        <p>
          <span className="font-semibold">Palces left:</span> {noOfApplicantsLeft}
        </p>
        <p>
          <span className="font-semibold">Education:</span> {job.education}
        </p>
      </div>

      <hr />

      {/* Salary & Exp */}
      <div className="flex justify-between text-sm">
        <span>{job.salary || "Amount Not Specified"}</span>
        <span className="font-semibold">{job.experience} Experience Level</span>
      </div>

      {/* Description */}
      <div>
        <h2 className="font-semibold text-lg">Job Description</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{job.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
          {job.type}
        </span>
        <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
          {job.site}
        </span>
        <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
          {job.experience}
        </span>
      </div>
    </div>
  );
}
