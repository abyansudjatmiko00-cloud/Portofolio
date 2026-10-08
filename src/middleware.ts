import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdminPage =
    request.nextUrl.pathname.startsWith("/admin");

  const isLoginPage =
    request.nextUrl.pathname === "/admin/login";

  const doorpass =
    request.nextUrl.searchParams.get("doorpass");

  const correctDoorpass =
    process.env.ADMIN_DOORPASS;

  // Check doorpass first
  if (isLoginPage) {
    if (doorpass !== correctDoorpass) {
      return new NextResponse("Access Denied", {
        status: 403,
      });
    }

    // Doorpass is correct, allow login page to load
    return NextResponse.next();
  }

  // Only create Supabase client for protected admin pages
  if (isAdminPage) {
    let response = NextResponse.next({
      request,
    });

    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                request.cookies.set(name, value);
                response.cookies.set(
                  name,
                  value,
                  options
                );
              }
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();

      url.pathname = "/admin/login";
      url.search = "";

      return NextResponse.redirect(url);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};