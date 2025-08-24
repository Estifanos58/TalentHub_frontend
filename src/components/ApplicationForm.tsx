"use client";

import { useState } from "react";
import axios from "axios";
import { applyJob } from "@/actions/applyJob";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter()

  // Upload file to Cloudinary
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME!}/upload`,
        formData
      );
      console.log("Upload successful:", res.data);
      setFileUrl(res.data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    // Example API call to your backend
    try {
      const response = await applyJob(jobId, coverLetter, fileUrl);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      setCoverLetter("");
      setFileUrl(null);
      router.refresh()
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit application");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Please enter your cover letter</h2>
      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Cover Letter..."
        className="w-full h-40 border rounded-lg p-3 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
      />
      <p className="text-sm text-gray-500">{1000 - coverLetter.length} chars left</p>

      {/* File Upload */}
      <input type="file" onChange={handleFileUpload} className="text-sm" />
      {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
      {fileUrl && (
        <p className="text-sm text-green-600">Uploaded: {fileUrl.split("/").pop()}</p>
      )}

      {/* Apply Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition"
      >
        Apply
      </button>
    </div>
  );

}