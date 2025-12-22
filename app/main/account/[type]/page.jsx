import React from "react";
import { notFound } from "next/navigation";
import Loginpage from "./Loginpage";
import Signuppage from "./Signuppage";
import Nextimage from "@/app/_globalcomps/Nextimage";
import DeviceDetector from "@/app/_globalcomps/Devicedetector";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const backgroundSizes = {
  mobile: {
    width: 320, // in pixels
    height: 600,
  },
  tablet: {
    width: 1024,
    height: 1200,
  },
  desktop: {
    width: 1920,
    height: 1440,
  },
};

async function page({ params, searchParams }) {
  const cookestore = await cookies();
  const token = cookestore.get("token");
  const { type } = await params;
  if (!(type == "login" || type == "signup")) notFound();
  const { redirect: redirectLink = "/" } = await searchParams;
  const device = await DeviceDetector();
  if (token) redirect(redirectLink);

  return (
    <div className="relative">
      <Nextimage
        src="/loginbackgroundimage.png"
        alt="blurry"
        width={backgroundSizes[device].width}
        height={backgroundSizes[device].height}
        className="absolute inset-0 object-cover w-full h-full brightness-50"
      />
      <div className="relative z-10 px-4">
        {type == "login" && <Loginpage redirectLink={redirectLink} />}
        {type == "signup" && <Signuppage redirectLink={redirectLink} />}
      </div>
    </div>
  );
}

export default page;
