import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import ImageUploadField from "@/components/ImageUploadField";

async function updateProyekAction(
  id: number,
  formData: FormData
) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const technologies = formData.get("technologies") as string;
  const link = (formData.get("link") as string) || null;

  const imageFile = formData.get("image") as File;

  // Get current project
  const { data: currentProject, error: currentProjectError } =
    await supabase
      .from("proyek")
      .select("image")
      .eq("id", id)
      .single();

  if (currentProjectError || !currentProject) {
    throw new Error("Project not found.");
  }

  let imageUrl = currentProject.image;

  // Only upload a new image if the user selected one
  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      throw new Error("The selected file must be an image.");
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5 MB.");
    }

    const fileExtension =
      imageFile.name.split(".").pop() || "jpg";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, imageFile, {
        contentType: imageFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error(
        "Failed to upload new image:",
        uploadError.message
      );

      throw new Error(
        `Failed to upload image: ${uploadError.message}`
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    imageUrl = publicUrlData.publicUrl;

    // Remove old image from Storage if it belongs to our bucket
    if (currentProject.image) {
      try {
        const oldImageUrl = new URL(currentProject.image);

        const marker = "/storage/v1/object/public/project-images/";

        const markerIndex = oldImageUrl.pathname.indexOf(marker);

        if (markerIndex !== -1) {
          const oldFilePath = decodeURIComponent(
            oldImageUrl.pathname.slice(
              markerIndex + marker.length
            )
          );

          if (oldFilePath) {
            const { error: removeError } = await supabase.storage
              .from("project-images")
              .remove([oldFilePath]);

            if (removeError) {
              console.error(
                "Failed to remove old image:",
                removeError.message
              );
            }
          }
        }
      } catch (error) {
        console.error(
          "Failed to process old image URL:",
          error
        );
      }
    }
  }

  const { error } = await supabase
    .from("proyek")
    .update({
      title,
      description,
      category,
      image: imageUrl,
      technologies,
      link,
    })
    .eq("id", id);

  if (error) {
    console.error(
      "Failed to update project:",
      error.message
    );

    throw new Error(
      `Failed to update project: ${error.message}`
    );
  }

  revalidatePath("/admin/proyek");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);

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

  const updateAction =
    updateProyekAction.bind(null, projectId);

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
                Update the information and details of this
                project. Changes will automatically appear on
                your public portfolio.
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
                  05 / Project Image
                </label>

                {/* Current Image */}
                <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Current Image
                    </p>

                    <span className="text-[10px] font-semibold text-emerald-600">
                      ● Active
                    </span>
                  </div>

                  <div className="p-4">
                    <img
                      src={proyek.image}
                      alt={proyek.title}
                      className="h-48 w-full rounded-xl object-cover"
                    />
                  </div>
                </div>

                <p className="mb-3 text-xs text-slate-400">
                  Select a new image only if you want to replace
                  the current image. Leave it unchanged to keep
                  the existing image.
                </p>

                <ImageUploadField />
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
            Changes are synchronized with Supabase and the
            public portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}