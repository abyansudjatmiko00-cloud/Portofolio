import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function hapusProyekAction(id: number) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("proyek")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete project:", error.message);
    return;
  }

  revalidatePath("/admin/proyek");
  revalidatePath("/projects");

  redirect("/admin/proyek?success=deleted");
}

export default async function HapusProyekPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();

  const { data: proyek } = await supabase
    .from("proyek")
    .select("id, title")
    .eq("id", projectId)
    .single();

  if (!proyek) {
    notFound();
  }

  const deleteAction = hapusProyekAction.bind(null, projectId);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Header */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Abyannz. / Admin / Projects / Delete
            </p>

            <h1 className="text-5xl font-black tracking-tight text-slate-950">
              DELETE PROJECT.
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              This action will permanently remove the selected project from
              your portfolio database.
            </p>
          </div>

          {/* Delete Card */}
          <div className="overflow-hidden rounded-3xl border-2 border-red-200 bg-white shadow-xl shadow-red-100/40">
            {/* Warning Header */}
            <div className="border-b border-red-200 bg-red-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg text-white">
                  !
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                    Warning
                  </p>

                  <p className="text-sm font-semibold text-red-700">
                    Permanent action
                  </p>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Selected Project
              </p>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold tracking-tight text-slate-950">
                      {proyek.title}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Project ID: #{String(proyek.id).padStart(2, "0")}
                    </p>
                  </div>

                  <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-500">
                    Delete
                  </span>
                </div>
              </div>

              {/* Confirmation */}
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-sm leading-6 text-slate-500">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-900">
                    {proyek.title}
                  </span>
                  ? This project will be removed from Supabase and will no
                  longer appear on the public portfolio.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <form action={deleteAction} className="flex-1">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.99]"
                  >
                    Delete Project
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </form>

                <a
                  href="/admin/proyek"
                  className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                >
                  Cancel
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
              DELETE / proyek / {projectId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}