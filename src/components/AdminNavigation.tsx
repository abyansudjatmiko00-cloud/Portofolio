"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavigation() {
  const pathname = usePathname();

  const isProjectsActive =
    pathname === "/admin/proyek" ||
    pathname.startsWith("/admin/proyek/");

  const isJourneyActive =
    pathname === "/admin/journey" ||
    pathname.startsWith("/admin/journey/");

  return (
    <nav className="hidden items-center gap-1 md:flex">
      <Link
        href="/admin/proyek"
        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
          isProjectsActive
            ? "bg-slate-950 text-white"
            : "border border-slate-200 bg-white text-slate-600 hover:border-slate-950 hover:bg-slate-950 hover:text-white"
        }`}
      >
        Projects
      </Link>

      <Link
        href="/admin/journey"
        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
          isJourneyActive
            ? "bg-slate-950 text-white"
            : "border border-slate-200 bg-white text-slate-600 hover:border-slate-950 hover:bg-slate-950 hover:text-white"
        }`}
      >
        Journey
      </Link>
    </nav>
  );
}