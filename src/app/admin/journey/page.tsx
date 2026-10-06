import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import SuccessToast from "@/components/SuccessToast";
import ImageUploadField from "@/components/ImageUploadField";

async function tambahJourneyAction(formData: FormData) {
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

  const { error } = await supabase.from("journey").insert({
    year,
    title,
    description,
    type,
  });

  if (error) {
    console.error(
      "Failed to add Journey:",
      error.message
    );

    throw new Error(
      `Failed to add Journey: ${error.message}`
    );
  }

  revalidatePath("/admin/journey");
  revalidatePath("/journey");

  redirect("/admin/journey?success=journey-added");
}

async function tambahMemoryAction(formData: FormData) {
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
    throw new Error("All Memory fields are required.");
  }

  if (!imageFile || imageFile.size === 0) {
    throw new Error("Memory image is required.");
  }

  if (!imageFile.type.startsWith("image/")) {
    throw new Error("The selected file must be an image.");
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5 MB.");
  }

  const fileExtension =
    imageFile.name.split(".").pop() || "jpg";

  const fileName =
    `${crypto.randomUUID()}.${fileExtension}`;

  const filePath = `memories/${fileName}`;

  const { error: uploadError } = await supabase.storage
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

  const { data: publicUrlData } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

  const imageUrl = publicUrlData.publicUrl;

  const { error } = await supabase
    .from("memories")
    .insert({
      category,
      label,
      title,
      description,
      image: imageUrl,
    });

  if (error) {
    console.error(
      "Failed to add Memory:",
      error.message
    );

    await supabase.storage
      .from("project-images")
      .remove([filePath]);

    throw new Error(
      `Failed to add Memory: ${error.message}`
    );
  }

  revalidatePath("/admin/journey");
  revalidatePath("/journey");
  revalidatePath("/journey/archives");

  redirect("/admin/journey?success=memory-added");
}

export default async function AdminJourneyPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
  }>;
}) {
  const { success } = await searchParams;

  const supabase =
    await createSupabaseServerClient();

  const {
    data: journey,
    error: journeyError,
  } = await supabase
    .from("journey")
    .select("*")
    .order("id", {
      ascending: true,
    });

  if (journeyError) {
    console.error(
      "Failed to fetch Journey:",
      journeyError.message
    );
  }

  const {
    data: memories,
    error: memoriesError,
  } = await supabase
    .from("memories")
    .select("*")
    .order("id", {
      ascending: true,
    });

  if (memoriesError) {
    console.error(
      "Failed to fetch Memories:",
      memoriesError.message
    );
  }

  let successMessage = "";

  if (success === "journey-added") {
    successMessage = "Journey added successfully!";
  }

  if (success === "memory-added") {
    successMessage = "Memory added successfully!";
  }

  if (success === "journey-updated") {
    successMessage = "Journey updated successfully!";
  }

  if (success === "memory-updated") {
    successMessage = "Memory updated successfully!";
  }

  if (success === "journey-deleted") {
    successMessage = "Journey deleted successfully!";
  }

  if (success === "memory-deleted") {
    successMessage = "Memory deleted successfully!";
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      {/* BACKGROUND GRID */}

      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* SUCCESS TOAST */}

      {successMessage && (
        <SuccessToast message={successMessage} />
      )}

      <div className="relative z-10 space-y-12">
        {/* HEADER */}

        <section className="border-b border-slate-200 pb-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Abyannz. / Admin / Journey
              </p>

              <h1 className="text-5xl font-black tracking-tight text-slate-950">
                JOURNEY.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Manage your journey timeline, achievements,
                experiences, and personal memories from one
                administration page.
              </p>
            </div>

            <div className="border-l border-slate-200 pl-6 md:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                DATABASE
              </p>

              <p className="mt-2 text-2xl font-black text-slate-900">
                SUPABASE
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                ● Connected
              </p>
            </div>
          </div>
        </section>

        {/* JOURNEY TIMELINE */}

        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                01 / Timeline
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Journey Timeline
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Manage the chronological stages of your journey.
              </p>
            </div>

            <span className="font-mono text-xs text-slate-400">
              {journey?.length ?? 0} ENTRIES
            </span>
          </div>

          {/* ADD JOURNEY */}

          <div className="mb-8 border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-sm">
            <div className="mb-6 border-b border-slate-200 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Add New Journey
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Create Timeline Entry
              </h3>
            </div>

            <form
              action={tambahJourneyAction}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="journey-year"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                  >
                    01 / Year
                  </label>

                  <input
                    id="journey-year"
                    name="year"
                    type="text"
                    placeholder="2026 — PRESENT"
                    required
                    className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="journey-type"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                  >
                    02 / Type
                  </label>

                  <input
                    id="journey-type"
                    name="type"
                    type="text"
                    placeholder="JOURNEY / DISCIPLINE / CONQUEST"
                    required
                    className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="journey-title"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  03 / Title
                </label>

                <input
                  id="journey-title"
                  name="title"
                  type="text"
                  placeholder="My Journey Title"
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-lg font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="journey-description"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  04 / Description
                </label>

                <textarea
                  id="journey-description"
                  name="description"
                  rows={4}
                  placeholder="Describe this stage of your journey..."
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.99]"
              >
                Add Journey

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </div>

          {/* JOURNEY LIST */}

          <div className="space-y-4">
            {journey && journey.length > 0 ? (
              journey.map((item, index) => (
                <article
                  key={item.id}
                  className="border border-slate-200 bg-white/90 p-5 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex min-w-0 items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-mono text-xs font-bold text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            {item.year}
                          </span>

                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {item.type}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-bold text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2 md:ml-6">
                      <Link
                        href={`/admin/journey/edit/${item.id}`}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/journey/hapus/${item.id}`}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-100"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No Journey entries found.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add your first Journey entry above.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* MEMORIES */}

        <section className="border-t border-slate-200 pt-12">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                02 / Memories
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Memories & Archives
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Manage the photos, achievements, experiences,
                and memories shown on your Journey page.
              </p>
            </div>

            <span className="font-mono text-xs text-slate-400">
              {memories?.length ?? 0} ENTRIES
            </span>
          </div>

          {/* ADD MEMORY */}

          <div className="mb-8 border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-sm">
            <div className="mb-6 border-b border-slate-200 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Add New Memory
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Create Memory Entry
              </h3>
            </div>

            <form
              action={tambahMemoryAction}
              encType="multipart/form-data"
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="memory-category"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                  >
                    01 / Category
                  </label>

                  <input
                    id="memory-category"
                    name="category"
                    type="text"
                    placeholder="PRAMUKA"
                    required
                    className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="memory-label"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                  >
                    02 / Label
                  </label>

                  <input
                    id="memory-label"
                    name="label"
                    type="text"
                    placeholder="SCOUT ACTIVITIES"
                    required
                    className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="memory-title"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  03 / Title
                </label>

                <input
                  id="memory-title"
                  name="title"
                  type="text"
                  placeholder="Moving Forward Together"
                  required
                  className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-lg font-semibold text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="memory-description"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  04 / Description
                </label>

                <textarea
                  id="memory-description"
                  name="description"
                  rows={4}
                  placeholder="Describe this memory..."
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  05 / Memory Image
                </label>

                <ImageUploadField required />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-[0.99]"
              >
                Add Memory

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </div>

          {/* MEMORY LIST */}

          <div className="grid gap-5 md:grid-cols-2">
            {memories && memories.length > 0 ? (
              memories.map((memory, index) => (
                <article
                  key={memory.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <Image
                      src={memory.image}
                      alt={`${memory.title} memory`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />

                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-lg">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        {memory.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      {memory.label}
                    </p>

                    <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                      {memory.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {memory.description}
                    </p>

                    <div className="mt-5 flex gap-2 border-t border-slate-100 pt-5">
                      <Link
                        href={`/admin/journey/memory/edit/${memory.id}`}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-xs font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/journey/memory/hapus/${memory.id}`}
                        className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-center text-xs font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-100"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No Memories found.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add your first Memory above.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM NOTE */}

        <div className="border-t border-slate-200 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
            Journey and Memory data are synchronized with
            Supabase and the public portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}