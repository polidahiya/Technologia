"use client";
import Link from "next/link";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import Nextimage from "../Nextimage";
import Searchbar from "./searchbar/Searchbar";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#191919] border-b">
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded bg-primary flex items-center justify-center bg-white">
              <Nextimage
                src="/logo.png"
                alt="Technologia logo"
                width={40}
                height={40}
                loading="lazy"
              />
            </div>
            <span className="text-lg font-semibold  text-white">
              Technologia
            </span>
          </Link>

          {/* Search */}
          <Searchbar />

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* CTA */}
            <Link
              href="/find-phone"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Find a phone for me
            </Link>
            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="h-9 w-9 rounded-xl border flex items-center justify-center bg-white"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth */}
            <Link
              href="/main/account/login"
              className="hidden sm:block text-sm  text-gray-300 hover:text-primary"
            >
              Login
            </Link>

            <Link
              href="/main/account/signup"
              className="hidden sm:block rounded px-3 py-1.5 text-sm bg-theme text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
