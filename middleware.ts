import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get(`${process.env.TOKEN_NAME}`)?.value;
  const signURL = new URL("/login", request.url);
  const homeURL = new URL("/", request.url);
  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(signURL);
  }
  if (request.nextUrl.pathname === "/login") {
    NextResponse.redirect(homeURL);
  }
}
export const config = {
  matcher: [
    "/",
    "/:path*",
    "/cadastro-motorista",
    "dashboard",
    "/registro",
    "/cadastro-nota",
    "/login",
    "/manutencao",
  ],
};
