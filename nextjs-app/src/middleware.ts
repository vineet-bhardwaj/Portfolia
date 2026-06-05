import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USER = process.env.DECK_USER ?? "vineet";
const PASS = process.env.DECK_PASSWORD ?? "change-me-in-vercel";

export function middleware(req: NextRequest) {
  const header = req.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Decks", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/decks/:path*"],
};
