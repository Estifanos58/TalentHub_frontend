'use client';

import { useUserStore } from "@/state/data";
import React, { useState } from "react";

function EmployerApp({ application }: any) {
  const [selectedStatus, setSelectedStatus] = useState<
    "shortlisted" | "rejected" | null
  >(null);
  const { user } = useUserStore();

  const handleSubmit = async () => {};

  return (
    <div>
      {user && user._id === application.jobId.createdBy ? (
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
            disabled={!selectedStatus}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default EmployerApp;
