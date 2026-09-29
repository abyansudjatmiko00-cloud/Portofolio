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

      <div className="relative z-10 space-y-10">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Abyannz. / Admin / Projects / Edit
              </p>

              <h1 className="text-5xl font-black tracking-tight text-slate-950">
                EDIT PROJECT.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Update the information and details of this project.
                Changes will automatically appear on your public portfolio.
              </p>
            </div>

            <div className="hidden border-l border-slate-200 pl-6 text-right sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                PROJECT ID
              </p>

              <p className="mt-2 font-mono text-3xl font-bold text-slate-900">
                {String(projectId).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        {/* Current Project */}
        <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
          <div className="border border-slate-200 bg-white/80 p-6 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Editing
            </p>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              {proyek.title}
            </h2>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-xs text-slate-500">
              <div className="flex justify-between gap-4">
                <span>Category</span>
                <span className="font-semibold text-slate-800">
                  {proyek.category}
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

          {/* Form */}
          <div className="border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-sm sm:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Project Information
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Update Entry
                </h2>
              </div>

              <span className="font-mono text-xs text-slate-400">
                PATCH / proyek
              </span>
            </div>

            <form action={updateAction} className="space-y-7">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  01 / Project Title
                </label>

                <input
                  id="title"
                  name="title"
                  defaultValue={proyek.title}
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-lg font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  02 / Category
                </label>

                <input
                  id="category"
                  name="category"
                  defaultValue={proyek.category}
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  03 / Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  defaultValue={proyek.description}
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                />
              </div>

              {/* Technologies */}
              <div>
                <label
                  htmlFor="technologies"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  04 / Technologies
                </label>

                <input
                  id="technologies"
                  name="technologies"
                  defaultValue={proyek.technologies ?? ""}
                  placeholder="Next.js, Supabase, TypeScript"
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  05 / Image URL
                </label>

                <input
                  id="image"
                  name="image"
                  defaultValue={proyek.image}
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              {/* Link */}
              <div>
                <label
                  htmlFor="link"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  06 / Project Link
                </label>

                <input
                  id="link"
                  name="link"
                  type="url"
                  defaultValue={proyek.link ?? ""}
                  placeholder="https://example.vercel.app"
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row">
                <button
                  type="submit"
                  className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.99]"
                >
                  Update Project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <a
                  href="/admin/proyek"
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-slate-200 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
            Changes are synchronized with Supabase and the public portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}