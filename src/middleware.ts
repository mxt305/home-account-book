import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse } from "next/server";

import { sessionOptions } from "./lib/session";

export const config = {
  matcher: "/api/:function*",
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }
  if (!user) {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }
}
