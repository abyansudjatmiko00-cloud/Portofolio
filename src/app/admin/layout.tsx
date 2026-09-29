import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function logoutAction() {
  "use server";

  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= ADMIN TOP BAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-[9999] border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[68px] max-w-[1400px] items-center justify-between px-5 md:px-8">
          {/* Brand */}
          <div className="flex items-center gap-8">
            <Link
              href="/admin/proyek"
              className="group flex items-center gap-3"
            >
              <span className="text-lg font-black tracking-tight text-slate-950">
                Abyannz.
              </span>

              <span className="hidden h-5 w-px bg-slate-200 sm:block" />

              <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
                Admin Panel
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href="/admin/proyek"
                className="rounded-full bg-slate-950 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-slate-700"
              >
                Projects
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Signed in as
              </p>

              <p className="mt-0.5 max-w-[220px] truncate text-xs font-medium text-slate-700">
                {user?.email}
              </p>
            </div>

            <div className="h-6 w-px bg-slate-200" />

            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="mx-auto max-w-[1400px] px-5 pt-[100px] pb-10 md:px-8 md:pt-[110px] md:pb-12">
        {children}
      </main>
    </div>
  );
}