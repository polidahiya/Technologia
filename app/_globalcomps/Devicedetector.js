import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export default async function DeviceDetector() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type || "desktop";

  return deviceType;
}

// deviceType === "mobile";
// deviceType === "tablet";
// deviceType === "desktop";
