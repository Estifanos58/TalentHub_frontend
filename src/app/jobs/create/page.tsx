"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react"; // Spinner icon
import { createJob } from "@/actions/createJob";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify"

// ----------------- Zod Schema -----------------
const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["permanent", "contract", "internship"]),
  site: z.enum(["on-site", "remote", "hybrid"]),
  experience: z.enum(["entry", "mid", "senior"]),
  applicantsNeeded: z.number().min(1, "At least 1 applicant is required"),
  deadline: z.date(),
  salary: z.number().min(0, "Salary must be positive"),
});

type JobFormValues = z.infer<typeof jobSchema>;

// ----------------- Component -----------------
export default function CreateJobPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "permanent",
      site: "on-site",
      experience: "entry",
      applicantsNeeded: 1,
      salary: 0,
      deadline: undefined,
    },
  });

  const onSubmit = async (values: JobFormValues) => {
    try {
      setLoading(true);
      console.log("Creating Job:", values);

      await createJob(values as any);
      toast.success("Job created successfully!")
      setLoading(false)
      router.push("/jobs");
      // reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background dark:bg-background-dark text-primary dark:text-primary-dark px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-primary-dark">
        Create a New Job
      </h1>

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* LEFT SIDE: Title & Description */}
            <div className="flex flex-col gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Software Engineer"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write job description..."
                        rows={10}
                        className="resize-none h-[300px]"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* RIGHT SIDE: Other fields */}
            <div className="flex flex-col gap-6">
              {/* Job Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 flex-wrap">
                        {["permanent", "contract", "internship"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={type}
                              checked={field.value === type}
                              onChange={() => field.onChange(type)}
                              disabled={loading}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Site */}
              <FormField
                control={form.control}
                name="site"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Site</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 flex-wrap">
                        {["on-site", "remote", "hybrid"].map((site) => (
                          <label
                            key={site}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={site}
                              checked={field.value === site}
                              onChange={() => field.onChange(site)}
                              disabled={loading}
                            />
                            {site}
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experience */}
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 flex-wrap">
                        {["entry", "mid", "senior"].map((level) => (
                          <label
                            key={level}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={level}
                              checked={field.value === level}
                              onChange={() => field.onChange(level)}
                              disabled={loading}
                            />
                            {level}
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Applicants Needed */}
              <FormField
                control={form.control}
                name="applicantsNeeded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. of Applicants Needed</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || undefined)
                        }
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Salary */}
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || undefined)
                        }
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deadline */}
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            disabled={loading}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(d) => {
                              setDate(d);
                              field.onChange(d);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Full width submit button */}
            <div className="col-span-1 md:col-span-2">
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Job"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
