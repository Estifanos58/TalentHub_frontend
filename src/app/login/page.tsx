"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/state/data";
import { loginUser } from "@/actions/loginUser";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [actionState, setActionState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { addUser } = useUserStore();
  const router = useRouter();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setActionState("loading");
      const response: any = await loginUser(data);
      toast.success("Login successful!");
      router.push('/jobs')
      setActionState("success");
      // console.log("response",response)
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
          Wellcome Back To TalentHub
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {actionState === "loading" ? "Logging in..." : "Login"}
          </button>

          {actionState === "success" && (
            <p className="text-green-500 mt-2 text-center">Login successful!</p>
          )}
          {actionState === "error" && (
            <p className="text-red-500 mt-2 text-center">Invalid credentials. Try again.</p>
          )}
        </form>

        {/* Register link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary dark:text-primary-dark hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
