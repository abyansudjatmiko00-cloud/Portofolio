import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";

async function updateJourneyAction(
  id: number,
  formData: FormData
) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const year = (formData.get("year") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const description = (
    formData.get("description") as string
  )?.trim();
  const type = (formData.get("type") as string)?.trim();

  if (!year || !title || !description || !type) {
    throw new Error("All Journey fields are required.");
  }

  const { error } = await supabase
    .from("journey")
    .update({
      year,
      title,
      description,
      type,
    })
    .eq("id", id);

  if (error) {
    console.error(
      "Failed to update Journey:",
      error.message
    );

    throw new Error(
      `Failed to update Journey: ${error.message}`
    );
  }

  revalidatePath("/admin/journey");
  revalidatePath("/journey");

  redirect(
    "/admin/journey?success=journey-updated"
  );
}

export default async function EditJourneyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const journeyId = Number(id);

  if (Number.isNaN(journeyId)) {
    notFound();
  }

  const supabase =
    await createSupabaseServerClient();

  const {
    data: journey,
    error,
  } = await supabase
    .from("journey")
    .select("*")
    .eq("id", journeyId)
    .single();

  if (error || !journey) {
    notFound();
  }

  const updateAction =
    updateJourneyAction.bind(
      null,
      journeyId
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">

      {/* BACKGROUND GRID */}

      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 space-y-10">

        {/* HEADER */}

        <div className="border-b border-slate-200 pb-8">

          <div className="flex items-start justify-between gap-6">

            <div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Abyannz. / Admin / Journey / Edit
              </p>

              <h1 className="text-5xl font-black tracking-tight text-slate-950">
                EDIT JOURNEY.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Update this Journey timeline entry.
                Changes will automatically appear on
                your public Journey page.
              </p>

            </div>

            <div className="hidden border-l border-slate-200 pl-6 text-right sm:block">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                JOURNEY ID
              </p>

              <p className="mt-2 font-mono text-3xl font-bold text-slate-900">
                {String(journeyId).padStart(2, "0")}
              </p>

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">

          {/* INFORMATION CARD */}

          <div className="border border-slate-200 bg-white/80 p-6 backdrop-blur-sm">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Editing
            </p>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              {journey.title}
            </h2>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-xs text-slate-500">

              <div className="flex justify-between gap-4">
                <span>Year</span>

                <span className="font-semibold text-slate-800">
                  {journey.year}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Type</span>

                <span className="font-semibold text-slate-800">
                  {journey.type}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Database</span>

                <span className="font-semibold text-slate-800">
                  Supabase
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Status</span>

                <span className="font-semibold text-emerald-600">
                  ● Connected
                </span>
              </div>

            </div>

          </div>

          {/* EDIT FORM */}

          <div className="border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-sm sm:p-8">

            <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Journey Information
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Update Entry
                </h2>

              </div>

              <span className="font-mono text-xs text-slate-400">
                PATCH / journey
              </span>

            </div>

            <form
              action={updateAction}
              className="space-y-7"
            >

              {/* YEAR */}

              <div>

                <label
                  htmlFor="year"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  01 / Year
                </label>

                <input
                  id="year"
                  name="year"
                  type="text"
                  defaultValue={journey.year}
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />

              </div>

              {/* TYPE */}

              <div>

                <label
                  htmlFor="type"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  02 / Type
                </label>

                <input
                  id="type"
                  name="type"
                  type="text"
                  defaultValue={journey.type}
                  required
                  placeholder="JOURNEY / DISCIPLINE / CONQUEST"
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />

              </div>

              {/* TITLE */}

              <div>

                <label
                  htmlFor="title"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  03 / Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={journey.title}
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-lg font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="description"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  04 / Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  defaultValue={journey.description}
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                />

              </div>

              {/* ACTIONS */}

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row">

                <button
                  type="submit"
                  className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.99]"
                >
                  Update Journey

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>

                </button>

                <Link
                  href="/admin/journey"
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                >
                  Cancel
                </Link>

              </div>

            </form>

          </div>

        </div>

        {/* BOTTOM NOTE */}

        <div className="border-t border-slate-200 py-6">

          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
            Changes are synchronized with Supabase and
            the public Journey page.
          </p>

        </div>

      </div>

    </div>
  );
}