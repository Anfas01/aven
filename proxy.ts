import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(
  request: NextRequest
) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  try {
    await verifyToken(token);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/cart",
    "/checkout",
    "/products",
    "/",
  ],
};