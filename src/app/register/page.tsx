"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/actions/registerUser";
import { useUserStore } from "@/state/data";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z.array(z.enum(["employer", "applicant", "admin"])).nonempty("Select at least one role"),
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [actionState, setActionState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { addUser } = useUserStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setActionState("loading");
      const response: any = await registerUser(data);
      router.push("/jobs")
      setActionState("success");
      addUser(response);
    } catch (err) {
      setActionState("idle");
      setActionState("error");
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-background dark:bg-background-dark">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-6 text-center">
          Welcome To TalentHub
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 text-primary dark:text-primary-dark">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-primary dark:text-primary-dark">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-primary dark:text-primary-dark">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Roles */}
          <div>
            <label className="block mb-1 text-primary dark:text-primary-dark">Select Role</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="employer" {...register("roles")} />
                Employer
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="applicant" {...register("roles")} />
                Applicant
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="admin" {...register("roles")} />
                Admin
              </label>
            </div>
            {errors.roles && (
              <p className="text-red-500 text-sm mt-1">{errors.roles.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={actionState === "loading"}
            className={`w-full py-2 rounded-md text-white ${
              actionState === "loading"
                ? "bg-green-400 cursor-not-allowed"
                : "bg-primary dark:bg-primary-dark hover:bg-secondary dark:hover:bg-secondary-dark"
            } transition-colors`}
          >
            {actionState === "loading" ? "Registering..." : "Register"}
          </button>

          {actionState === "success" && (
            <p className="text-green-500 mt-2 text-center">Registration successful!</p>
          )}
          {actionState === "error" && (
            <p className="text-red-500 mt-2 text-center">Something went wrong. Try again.</p>
          )}
        </form>

        {/* Login link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary dark:text-primary-dark hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
