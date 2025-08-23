"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen animate-pulse">
      <h1 className="text-3xl font-bold mb-6 text-gray-300">Loading...</h1>

      {/* Top Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="bg-white shadow-md rounded-2xl h-[100px] flex items-center"
          >
            <CardContent className="p-6 flex items-center gap-4 w-full">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="w-24 h-3 bg-gray-200 rounded mb-2" />
                <div className="w-16 h-4 bg-gray-300 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications Chart + Insights Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Applications Chart Skeleton */}
        <Card className="bg-white shadow-md rounded-2xl h-[360px]">
          <CardContent className="p-6">
            <div className="w-40 h-4 bg-gray-200 rounded mb-6" />
            <div className="w-full h-64 bg-gray-100 rounded-lg" />
          </CardContent>
        </Card>

        {/* Insights Skeleton */}
        <Card className="bg-white shadow-md rounded-2xl">
          <CardContent className="p-6">
            <div className="w-28 h-4 bg-gray-200 rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    i === 4 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="w-24 h-3 bg-gray-200 rounded mb-2" />
                    <div className="w-16 h-4 bg-gray-300 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
