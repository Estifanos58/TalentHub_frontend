"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Award, Briefcase, Building2, Users, FilePlus2, UserPlus } from "lucide-react";
import { getAdminDashboard } from "@/actions/getAdminDashboard";
import {toast} from 'react-toastify'
import DashboardSkeleton from "@/components/AdminLoading";

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

  if (loading) return <DashboardSkeleton/>
  if (!data) return <p className="p-6 text-red-500 dark:text-red-400">Failed to load dashboard.</p>;

  const applicationStats = [
    { name: "Shortlisted", value: data.applications.shortlisted },
    { name: "Rejected", value: data.applications.rejected },
    { name: "Pending", value: data.applications.pending },
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">📊 Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <Users className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.users.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <Briefcase className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.jobs.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <FileText className="w-10 h-10 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Applications</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.applications.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <Award className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.applications.conversionRate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Applications Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationStats}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#f9fafb" }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Most Applied Job */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Most Applied Job</p>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {data.insights.mostAppliedJob || "N/A"}
                  </p>
                </div>
              </div>

              {/* Top Employer */}
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <Building2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Top Employer</p>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {data.insights.topEmployer
                      ? `${data.insights.topEmployer.username} (${data.insights.topEmployer.email})`
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Avg Applicants per Job */}
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg Applicants per Job</p>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {data.jobs.avgApplicantsPerJob.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* New Users (7 days) */}
              <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
                <UserPlus className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">New Users (7 days)</p>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {data.users.newLast7Days}
                  </p>
                </div>
              </div>

              {/* New Jobs (30 days) */}
              <div className="flex items-center gap-3 p-4 bg-pink-50 dark:bg-pink-900/30 rounded-xl sm:col-span-2">
                <FilePlus2 className="w-6 h-6 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">New Jobs (30 days)</p>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {data.jobs.newLast30Days}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
