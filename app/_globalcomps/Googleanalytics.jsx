"use client";
import { GoogleAnalytics } from "nextjs-google-analytics";

function Googleanayltics() {
  return (
    <GoogleAnalytics
      trackPageViews
      disabled={process.env.NODE_ENV === "development"}
    />
  );
}

export default Googleanayltics;

// import { event } from "nextjs-google-analytics";
// event("button_click", {
//   category: "User Interaction",
//   label: "Buy Now Button",
//   value: 1,
// });
