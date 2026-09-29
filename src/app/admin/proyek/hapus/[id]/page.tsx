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

  redirect("/admin/proyek");
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
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h1 className="text-xl font-bold text-slate-800 mb-2">
          Delete Project
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Are you sure you want to delete this project?
        </p>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-slate-800">
            {proyek.title}
          </p>
        </div>

        <div className="flex gap-3">
          <form action={deleteAction}>
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Delete Project
            </button>
          </form>

          <a
            href="/admin/proyek"
            className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-200 transition-colors"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}