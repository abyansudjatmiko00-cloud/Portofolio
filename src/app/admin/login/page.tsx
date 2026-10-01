import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function loginAction(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/login?error=Kredensial+tidak+valid");
  }

  redirect("/admin/journey");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 text-slate-900">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-8">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-400">
            Abyannz. / Admin
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Sign in to manage the projects displayed on your portfolio.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-7 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
          {params.error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                {params.error}
              </p>
            </div>
          )}

          <form action={loginAction} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.99]"
            >
              Sign In →
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Abyannz.</span>
          <span>Portfolio Management</span>
        </div>
      </div>
    </main>
  );
}