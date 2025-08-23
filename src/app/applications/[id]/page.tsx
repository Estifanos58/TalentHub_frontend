import { getApplicationDetail } from "@/actions/getApplicationDetail";
import EmployerApp from "@/components/EmployerApp";
import React from "react";
import { toast } from "react-toastify";

export default async function ApplicationDetail({
  params,
}: {
  params: { id: string };
}) {
  let application: any;
  try {
    application = await getApplicationDetail(params.id);
    console.log('Application Details:', application);
  } catch (error) {
    toast.error("Failed to load application details.");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl shadow">
      {/* Left Side: Job Detail */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-2">
        <h2 className="text-xl font-bold">{application.jobId.title}</h2>
        <p className="text-gray-600">Company: {application.jobId.createdBy.username}</p>
        <p className="text-gray-700">{application.jobId.description}</p>
        <p className="text-gray-600">Site: {application.jobId.site}</p>
        <p className="text-gray-600">Experience: {application.jobId.experience}</p>
        <p className="text-gray-600">Type: {application.jobId.type}</p>
        <p className="text-gray-600">Salary: ${application.jobId.salary}</p>
        <p className="text-gray-600">Deadline: {new Date(application.jobId.deadline).toLocaleDateString()}</p>
        <p className="text-gray-600">Number of Applicants: {application.jobId.noOfApplicants}</p>
        <p className="text-gray-600">Applicants Needed: {application.jobId.applicantsNeeded}</p>
      </div>

      {/* Right Side: Application Detail */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
        <p>
          <span className="font-semibold">Name:</span> {application.userId.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {application.userId.email}
        </p>
        <p className="mt-4">
          <span className="font-semibold">Cover Letter:</span>
        </p>
        <p className="text-gray-700">
          {application.coverLetter || "No cover letter provided"}
        </p>
        <p className="mt-4">
          <span className="font-semibold">Resume:</span>
        </p>
        {application.resume ? (
          <a
            href={application.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-500">No resume uploaded</p>
        )}

        <p className="mt-4">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              application.status === "applied"
                ? "bg-yellow-100 text-yellow-800"
                : application.status === "shortlisted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {application.status}
          </span>
        </p>

        <EmployerApp application={application} />
      </div>
    </div>
  );
}
