"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Briefcase, FileText, Award } from "lucide-react";
import { getAdminDashboard } from "@/actions/getAdminDashboard";
import {toast} from 'react-toastify'

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await getAdminDashboard()
        setData(res);
      } catch (error) {
        console.error("Error loading dashboard:", error);
        toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!data) return <p className="p-6 text-red-500">Failed to load dashboard.</p>;

  const applicationStats = [
    { name: "Shortlisted", value: data.applications.shortlisted },
    { name: "Rejected", value: data.applications.rejected },
    { name: "Pending", value: data.applications.pending },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <Users className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{data.users.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <Briefcase className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Jobs</p>
              <p className="text-2xl font-bold">{data.jobs.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <FileText className="w-10 h-10 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Applications</p>
              <p className="text-2xl font-bold">{data.applications.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <Award className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold">{data.applications.conversionRate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Applications Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Insights</h2>
            <p>
              <span className="font-medium">Most Applied Job:</span>{" "}
              {data.insights.mostAppliedJob || "N/A"}
            </p>
            <p>
              <span className="font-medium">Top Employer:</span>{" "}
              {data.insights.topEmployer
                ? `${data.insights.topEmployer.username} (${data.insights.topEmployer.email})`
                : "N/A"}
            </p>
            <p>
              <span className="font-medium">Avg Applicants per Job:</span>{" "}
              {data.jobs.avgApplicantsPerJob.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">New Users (7 days):</span>{" "}
              {data.users.newLast7Days}
            </p>
            <p>
              <span className="font-medium">New Jobs (30 days):</span>{" "}
              {data.jobs.newLast30Days}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
