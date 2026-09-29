import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function updateProyekAction(
  id: number,
  formData: FormData
) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const technologies = formData.get("technologies") as string;
  const link = (formData.get("link") as string) || null;

  const { error } = await supabase
    .from("proyek")
    .update({
      title,
      description,
      category,
      image,
      technologies,
      link,
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update project:", error.message);
    return;
  }

  revalidatePath("/admin/proyek");
  revalidatePath("/projects");

  redirect("/admin/proyek");
}

export default async function EditProyekPage({
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
    .select("*")
    .eq("id", projectId)
    .single();

  if (!proyek) {
    notFound();
  }

  const updateAction = updateProyekAction.bind(null, projectId);

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Edit Project
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Update the information of this project.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <form action={updateAction} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Project Title
            </label>

            <input
              id="title"
              name="title"
              defaultValue={proyek.title}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Category
            </label>

            <input
              id="category"
              name="category"
              defaultValue={proyek.category}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              defaultValue={proyek.description}
              required
              rows={5}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Technologies
            </label>

            <input
              id="technologies"
              name="technologies"
              defaultValue={proyek.technologies ?? ""}
              placeholder="Next.js, Supabase, TypeScript"
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Image URL
            </label>

            <input
              id="image"
              name="image"
              defaultValue={proyek.image}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Project Link
            </label>

            <input
              id="link"
              name="link"
              type="url"
              defaultValue={proyek.link ?? ""}
              placeholder="https://example.vercel.app"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Update Project
            </button>

            <a
              href="/admin/proyek"
              className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}