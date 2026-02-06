import { NextResponse } from "next/server";

export function proxy(req) {
  const ua = req.headers.get("user-agent") || "";

  if (ua.includes("ClaudeBot")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

// Apply to EVERYTHING
export const config = {
  matcher: "/:path*",
};
