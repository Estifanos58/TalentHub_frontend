"use client";

import { updateApplicationStatus } from "@/actions/updateApplicationStatus";
import { useUserStore } from "@/state/data";
import React, { useState } from "react";
import { toast } from "react-toastify";

function EmployerApp({ application }: any) {
  const [selectedStatus, setSelectedStatus] = useState<
    "shortlisted" | "rejected" | null
  >(null);
  const { user } = useUserStore();
  const [isLoading, setLoading] =  useState(false)

  const handleSubmit = async () => {
    try {
      if (!selectedStatus) {
        return;
      }
      setLoading(true)
      await updateApplicationStatus({applicationId: application._id, status:selectedStatus});
      
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally{
      setLoading(false)
      setSelectedStatus(null)
    }
  };

  return (
    <div>
      {user && user._id === application.jobId.createdBy._id ? (
        <div className="mt-6 space-y-3">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedStatus("shortlisted")}
              className={`px-4 py-2 rounded-lg ${
                selectedStatus === "shortlisted"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Shortlist
            </button>
            <button
              onClick={() => setSelectedStatus("rejected")}
              className={`px-4 py-2 rounded-lg ${
                selectedStatus === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-800"
              }`}
            >
              Reject
            </button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!selectedStatus || isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
           {isLoading ? "Submitting ..." : "Submit"  } 
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default EmployerApp;
