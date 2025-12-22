"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "../Serveraction";
import { AppContextfn } from "@/app/Context";

function Signuppage({ redirectLink = "/" }) {
  const router = useRouter();
  const { setmessagefn } = AppContextfn();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await signup(form);
    setloading(false);
    setmessagefn(res.message);
    if (res.status === 200) router.replace(redirectLink);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <button
          className="absolute top-4 right-4 rounded-full w-10 aspect-square bg-gray-100"
          onClick={() => router.back()}
        >
          X
        </button>
        {/*  */}
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-theme"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-theme"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-theme pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-2 bg-theme text-white rounded-lg hover:bg-theme"
          >
            {loading && (
              <span className="inline-block h-5 aspect-square rounded-full border-t-2 border-b-2 border-white animate-spin"></span>
            )}
            Sign Up
          </button>
        </form>

        {/* Already signed up */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link prefetch={false} href="/account/login" className="text-theme hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signuppage;
