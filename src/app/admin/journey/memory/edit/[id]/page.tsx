import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";

async function updateMemoryAction(
  id: number,
  formData: FormData
) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const category = (
    formData.get("category") as string
  )?.trim();

  const label = (
    formData.get("label") as string
  )?.trim();

  const title = (
    formData.get("title") as string
  )?.trim();

  const description = (
    formData.get("description") as string
  )?.trim();

  const imageFile = formData.get("image") as File;

  if (!category || !label || !title || !description) {
    throw new Error(
      "All Memory fields are required."
    );
  }

  let imageUrl: string | undefined;

  /*
   * IMAGE UPDATE
   * Jika user memilih gambar baru,
   * upload gambar tersebut ke Supabase Storage.
   */

  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      throw new Error(
        "The selected file must be an image."
      );
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      throw new Error(
        "Image size must be less than 5 MB."
      );
    }

    const fileExtension =
      imageFile.name.split(".").pop() || "jpg";

    const fileName =
      `${crypto.randomUUID()}.${fileExtension}`;

    const filePath =
      `memories/${fileName}`;

    const { error: uploadError } =
      await supabase.storage
        .from("project-images")
        .upload(filePath, imageFile, {
          contentType: imageFile.type,
          upsert: false,
        });

    if (uploadError) {
      console.error(
        "Failed to upload Memory image:",
        uploadError.message
      );

      throw new Error(
        `Failed to upload image: ${uploadError.message}`
      );
    }

    const { data: publicUrlData } =
      supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

    imageUrl = publicUrlData.publicUrl;
  }

  /*
   * UPDATE DATABASE
   */

  const updateData: {
    category: string;
    label: string;
    title: string;
    description: string;
    image?: string;
  } = {
    category,
    label,
    title,
    description,
  };

  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const { error } = await supabase
    .from("memories")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error(
      "Failed to update Memory:",
      error.message
    );

    throw new Error(
      `Failed to update Memory: ${error.message}`
    );
  }

  revalidatePath("/admin/journey");
  revalidatePath("/journey");
  revalidatePath("/journey/archives");

  redirect(
    "/admin/journey?success=memory-updated"
  );
}

export default async function EditMemoryPage({
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
    .select("*")
    .eq("id", memoryId)
    .single();

  if (error || !memory) {
    notFound();
  }

  const updateAction =
    updateMemoryAction.bind(
      null,
      memoryId
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
                Abyannz. / Admin / Journey / Memory / Edit
              </p>

              <h1 className="text-5xl font-black tracking-tight text-slate-950">
                EDIT MEMORY.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Update this memory entry and optionally
                replace its image.
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

        {/* CONTENT */}

        <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
          {/* INFORMATION CARD */}

          <div className="border border-slate-200 bg-white/80 p-6 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Editing
            </p>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              {memory.title}
            </h2>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-xs text-slate-500">
              <div className="flex justify-between gap-4">
                <span>Category</span>

                <span className="font-semibold text-slate-800">
                  {memory.category}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Label</span>

                <span className="font-semibold text-slate-800">
                  {memory.label}
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

            {/* CURRENT IMAGE */}

            <div className="mt-6 border-t border-slate-200 pt-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Current Image
              </p>

              <div className="relative h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <Image
                  src={memory.image}
                  alt={`${memory.title} memory`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* EDIT FORM */}

          <div className="border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-sm sm:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Memory Information
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Update Entry
                </h2>
              </div>

              <span className="font-mono text-xs text-slate-400">
                PATCH / memories
              </span>
            </div>

            <form
              action={updateAction}
              encType="multipart/form-data"
              className="space-y-7"
            >
              {/* CATEGORY */}

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  01 / Category
                </label>

                <input
                  id="category"
                  name="category"
                  type="text"
                  defaultValue={memory.category}
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              {/* LABEL */}

              <div>
                <label
                  htmlFor="label"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  02 / Label
                </label>

                <input
                  id="label"
                  name="label"
                  type="text"
                  defaultValue={memory.label}
                  required
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
                  defaultValue={memory.title}
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
                  defaultValue={memory.description}
                  required
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                />
              </div>

              {/* IMAGE */}

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  05 / Replace Image
                </label>

                <label
                  htmlFor="image"
                  className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 transition-all hover:border-slate-950 hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      Choose New Image
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Leave empty to keep the current image ·
                      PNG, JPG, WEBP · Max 5 MB
                    </p>
                  </div>

                  <span className="ml-4 shrink-0 rounded-full bg-slate-950 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
                    Browse
                  </span>

                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                  />
                </label>
              </div>

              {/* ACTIONS */}

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row">
                <button
                  type="submit"
                  className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.99]"
                >
                  Update Memory

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
            Changes are synchronized with Supabase,
            the public Journey page, and Journey Archives.
          </p>
        </div>
      </div>
    </div>
  );
}