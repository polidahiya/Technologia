"use client";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import Nextimage from "../Nextimage";
import Searchbar from "./searchbar/Searchbar";
import { icons } from "@/lib/data";
import { TiUser } from "react-icons/ti";
import { logout } from "@/app/main/account/Serveraction";
import { AppContextfn } from "@/app/Context";
import { useRouter } from "next/navigation";

export default function Navbar({ device, tokenres }) {
  const [showsearch, setshowsearch] = useState(false);
  const [showLoginlinks, setshowLoginlinks] = useState(false);
  const ismobile = device == "mobile";

  return (
    <nav className="h-16 w-full sticky top-0 left-0 z-50 bg-bg2 border-b">
      <div className="mx-auto max-w-7xl px-4 lg:px-2">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          {!showsearch && (
            <Link
              href="/main"
              prefetch={false}
              className="flex items-center gap-2"
            >
              <div className="h-9 w-9 rounded bg-primary flex items-center justify-center bg-white">
                <Nextimage
                  src="/logo.png"
                  alt="Tecknologia logo"
                  width={40}
                  height={40}
                  loading="lazy"
                />
              </div>
              <span className="text-lg font-semibold  text-white">
                Tecknologia
              </span>
            </Link>
          )}

          {/* Search */}
          {ismobile ? (
            showsearch && (
              <div className={`ml-6 md:ml-12 flex-1`}>
                <Searchbar autoFocus={true} />
              </div>
            )
          ) : (
            <div className={`ml-6 md:ml-12 flex-1`}>
              <Searchbar />
            </div>
          )}

          {/* Right actions */}
          {!showsearch && (
            <div className="ml-auto flex items-center gap-2">
              {/* CTA */}
              <Link
                prefetch={false}
                href="/main/all?ReleaseDate=available"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:text-theme hover:underline"
              >
                Find a phone
              </Link>
              {/* Auth */}
              {ismobile || device == "tablet" ? (
                showLoginlinks && (
                  <div className="absolute top-full right-2 translate-y-2 bg-bg2 p-5 flex items-center gap-5">
                    <Loginlinks tokenres={tokenres} />
                  </div>
                )
              ) : (
                <Loginlinks tokenres={tokenres} />
              )}
            </div>
          )}
          {ismobile && (
            <button
              className={`text-white ${showsearch ? "text-2xl" : "p-2"}`}
              onClick={() => setshowsearch((pre) => !pre)}
            >
              {showsearch ? <>{icons.Cross}</> : <Search />}
            </button>
          )}

          {!showsearch && ismobile && (
            <button
              className="text-2xl border rounded-full text-white"
              onClick={() => setshowLoginlinks((pre) => !pre)}
            >
              {showLoginlinks ? icons.Cross : <TiUser />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

const Loginlinks = ({ tokenres }) => {
  const { setmessagefn } = AppContextfn();
  const router = useRouter();
  return (
    <div className="h-full flex items-center flex-col-reverse lg:flex-row gap-2">
      {tokenres?.verified ? (
        <>
          <button
            className="text-sm  px-10 lg:px-3 py-1.5 text-gray-300 hover:text-primary"
            onClick={async () => {
              const res = await logout();
              setmessagefn(res?.message);
              if (res.status == 200) {
                router.push("/main");
              }
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            prefetch={false}
            href="/main/account/login"
            className="text-sm  px-10 lg:px-3 py-1.5 text-gray-300 hover:text-primary"
          >
            Login
          </Link>

          <Link
            prefetch={false}
            href="/main/account/signup"
            className="rounded px-10 lg:px-3 py-1.5 text-sm bg-theme text-white"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};
