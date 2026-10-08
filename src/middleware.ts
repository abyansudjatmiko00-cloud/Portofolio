import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminPage =
    request.nextUrl.pathname.startsWith("/admin");

  const isLoginPage =
    request.nextUrl.pathname === "/admin/login";

  const doorpass =
    request.nextUrl.searchParams.get("doorpass");

  const correctDoorpass =
    process.env.ADMIN_DOORPASS;

  if (isLoginPage && doorpass !== correctDoorpass) {
    return new NextResponse("Access Denied", {
      status: 403,
    });
  }

  if (isAdminPage && !isLoginPage && !user) {
    const url = request.nextUrl.clone();

    url.pathname = "/admin/login";
    url.search = "";

    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};