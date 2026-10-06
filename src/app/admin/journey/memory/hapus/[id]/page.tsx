import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";

async function deleteMemoryAction(id: number) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const { data: memory, error: fetchError } = await supabase
    .from("memories")
    .select("id, title, image")
    .eq("id", id)
    .single();

  if (fetchError || !memory) {
    throw new Error("Memory not found.");
  }

  const { error: deleteError } = await supabase
    .from("memories")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(
      "Failed to delete Memory:",
      deleteError.message
    );

    throw new Error(
      `Failed to delete Memory: ${deleteError.message}`
    );
  }

  revalidatePath("/admin/journey");
  revalidatePath("/journey");
  revalidatePath("/journey/archives");

  redirect(
    "/admin/journey?success=memory-deleted"
  );
}

export default async function DeleteMemoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const memoryId = Number(id);

  if (Number.isNaN(memoryId)) {
    notFound();
  }

  const supabase =
    await createSupabaseServerClient();

  const {
    data: memory,
    error,
  } = await supabase
    .from("memories")
    .select(
      "id, category, label, title, description, image"
    )
    .eq("id", memoryId)
    .single();

  if (error || !memory) {
    notFound();
  }

  const deleteAction =
    deleteMemoryAction.bind(
      null,
      memoryId
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Background Grid */}

      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl space-y-10 p-6 sm:p-10">
        {/* Header */}

        <div className="border-b border-slate-200 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Abyannz. / Admin / Journey / Memory / Delete
          </p>

          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tight text-slate-950">
                DELETE MEMORY.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Remove this memory entry permanently
                from the Journey section.
              </p>
            </div>

            <div className="hidden border-l border-slate-200 pl-6 text-right sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                MEMORY ID
              </p>

              <p className="mt-2 font-mono text-3xl font-bold text-slate-900">
                {String(memoryId).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Preview */}

          <div className="border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Memory Preview
            </p>

            <div className="relative mt-5 h-64 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <Image
                src={memory.image}
                alt={`${memory.title} memory`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                {memory.category}
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                {memory.title}
              </h2>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                {memory.label}
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                {memory.description}
              </p>
            </div>
          </div>

          {/* Confirmation */}

          <div className="border border-red-200 bg-white/90 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-sm sm:p-8">
            <div className="mb-8 border-b border-red-100 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                Danger Zone
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Remove this memory?
              </h2>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">
                  !
                </div>

                <div>
                  <p className="text-sm font-bold text-red-900">
                    This action cannot be undone.
                  </p>

                  <p className="mt-2 text-xs leading-6 text-red-700">
                    The memory will be permanently removed
                    from Supabase and will no longer appear
                    on the Journey page or Journey Archives.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <form action={deleteAction}>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-[0.99]"
                >
                  Delete Memory

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>

              <Link
                href="/admin/journey"
                className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Info */}

        <div className="border-t border-slate-200 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
            Deleting this entry synchronizes with
            Supabase, the public Journey page, and
            Journey Archives.
          </p>
        </div>
      </div>
    </div>
  );
}