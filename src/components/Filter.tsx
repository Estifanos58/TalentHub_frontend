"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const options = {
  type: ["permanent", "contract", "internship"],
  site: ["on-site", "remote", "hybrid"],
  experience: ["entry", "mid", "senior"],
};

export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedType, setSelectedType] = useState<string | null>(searchParams.get("type"));
  const [selectedSite, setSelectedSite] = useState<string | null>(searchParams.get("site"));
  const [selectedExp, setSelectedExp] = useState<string | null>(searchParams.get("experience"));

  // State to manage the expansion of each filter section
  const [expanded, setExpanded] = useState({
    type: true,
    site: true,
    experience: true,
  });

  // Update URL query whenever selection changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (search) params.set("search", search);
    else params.delete("search");

    if (selectedType) params.set("type", selectedType);
    else params.delete("type");

    if (selectedSite) params.set("site", selectedSite);
    else params.delete("site");

    if (selectedExp) params.set("experience", selectedExp);
    else params.delete("experience");

    // Reset page to 1 when filter changes
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }, [search, selectedType, selectedSite, selectedExp, pathname, router]);

  const handleSelect = (key: "type" | "site" | "experience", value: string) => {
    if (key === "type") setSelectedType(value === selectedType ? null : value);
    if (key === "site") setSelectedSite(value === selectedSite ? null : value);
    if (key === "experience") setSelectedExp(value === selectedExp ? null : value);
  };
  
  const handleToggle = (key: "type" | "site" | "experience") => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCheckboxes = (key: "type" | "site" | "experience") => {
    return options[key].map((val) => {
      const selected =
        (key === "type" && val === selectedType) ||
        (key === "site" && val === selectedSite) ||
        (key === "experience" && val === selectedExp);

      return (
        <label
          key={val}
          className={`flex items-center gap-2 cursor-pointer ${
            selected ? "font-semibold text-primary dark:text-primary-dark" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={!!selected}
            onChange={() => handleSelect(key, val)}
            className="accent-primary dark:accent-primary-dark"
          />
          {val.charAt(0).toUpperCase() + val.slice(1)}
        </label>
      );
    });
  };

  return (
    <div className="w-full md:w-64 p-4 bg-white dark:bg-gray-800 shadow-md rounded-md flex flex-col gap-4">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      {/* Job Type */}
      <div>
        <h3
          className="font-semibold mb-2 flex items-center justify-between cursor-pointer"
          onClick={() => handleToggle("type")}
        >
          Job Type
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-300 ${expanded.type ? "rotate-180" : ""}`}
          />
        </h3>
        {expanded.type && (
          <div className="flex flex-col gap-1 transition-all duration-300">
            {renderCheckboxes("type")}
          </div>
        )}
      </div>

      {/* Site */}
      <div>
        <h3
          className="font-semibold mb-2 flex items-center justify-between cursor-pointer"
          onClick={() => handleToggle("site")}
        >
          Site
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-300 ${expanded.site ? "rotate-180" : ""}`}
          />
        </h3>
        {expanded.site && (
          <div className="flex flex-col gap-1 transition-all duration-300">
            {renderCheckboxes("site")}
          </div>
        )}
      </div>

      {/* Experience */}
      <div>
        <h3
          className="font-semibold mb-2 flex items-center justify-between cursor-pointer"
          onClick={() => handleToggle("experience")}
        >
          Experience
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-300 ${expanded.experience ? "rotate-180" : ""}`}
          />
        </h3>
        {expanded.experience && (
          <div className="flex flex-col gap-1 transition-all duration-300">
            {renderCheckboxes("experience")}
          </div>
        )}
      </div>
    </div>
  );
}