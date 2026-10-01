import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";

async function deleteJourneyAction(id: number) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("journey")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Failed to delete Journey:",
      error.message
    );

    throw new Error(
      `Failed to delete Journey: ${error.message}`
    );
  }

  revalidatePath("/admin/journey");
  revalidatePath("/journey");

  redirect(
    "/admin/journey?success=journey-deleted"
  );
}

export default async function DeleteJourneyPage({
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

  const deleteAction =
    deleteJourneyAction.bind(
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

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Abyannz. / Admin / Journey / Delete
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-950">
            DELETE JOURNEY.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
            Remove this Journey timeline entry from
            your portfolio database.
          </p>

        </div>


        {/* DELETE CARD */}

        <div className="mx-auto max-w-2xl">

          <div className="border border-red-200 bg-white p-8 shadow-xl shadow-red-100/50">

            {/* WARNING */}

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
              ⚠️
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
              Permanent Action
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Delete this Journey?
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              You are about to permanently delete the
              following Journey entry. This action cannot
              be undone.
            </p>


            {/* JOURNEY INFO */}

            <div className="mt-8 border border-slate-200 bg-slate-50 p-6">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {journey.year}
                </span>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {journey.type}
                </span>

              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-950">
                {journey.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {journey.description}
              </p>

            </div>


            {/* DATABASE INFO */}

            <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:grid-cols-2">

              <div className="flex justify-between gap-4">
                <span>Journey ID</span>

                <span className="font-mono font-semibold text-slate-900">
                  {journeyId}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Database</span>

                <span className="font-semibold text-slate-900">
                  Supabase
                </span>
              </div>

            </div>


            {/* ACTIONS */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <form
                action={deleteAction}
                className="flex-1"
              >

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.99]"
                >
                  Delete Journey

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>

                </button>

              </form>

              <Link
                href="/admin/journey"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
              >
                Cancel
              </Link>

            </div>

          </div>


          {/* NOTE */}

          <div className="mt-6 border border-slate-200 bg-white p-5">

            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
              This action permanently removes the entry
              from the Journey table in Supabase.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}