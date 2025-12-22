"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../Serveraction";
import { AppContextfn } from "@/app/Context";

function LoginPage({ redirectLink = "/" }) {
  const router = useRouter();
  const { setmessagefn } = AppContextfn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await login({ email, password });
    setloading(false);
    setmessagefn(res.message);
    if (res.status === 200) {
      router.replace(res?.storeid ? `/${res?.storeid}` : redirectLink);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <button
          className="absolute top-4 right-4 rounded-full w-10 aspect-square bg-gray-100"
          onClick={() => router.back()}
        >
          X
        </button>
        {/*  */}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-theme"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-theme"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-theme text-white py-2 rounded-lg hover:bg-theme transition"
          >
            {loading && (
              <span className="inline-block h-5 aspect-square rounded-full border-t-2 border-b-2 border-white animate-spin"></span>
            )}
            Login
          </button>
        </form>
        {/* Already registered */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link prefetch={false}
            href="/account/signup"
            className="text-theme hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
