import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import ImageUploadField from "@/components/ImageUploadField";

async function tambahProyekAction(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const technologies = formData.get("technologies") as string;
  const link = (formData.get("link") as string) || null;

  // ================= IMAGE UPLOAD =================
  const imageFile = formData.get("image") as File;

  if (!imageFile || imageFile.size === 0) {
    throw new Error("Project image is required.");
  }

  // Only allow image files
  if (!imageFile.type.startsWith("image/")) {
    throw new Error("The selected file must be an image.");
  }

  // Maximum 5 MB
  if (imageFile.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5 MB.");
  }

  // Create unique file name
  const fileExtension = imageFile.name.split(".").pop() || "jpg";
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `projects/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filePath, imageFile, {
      contentType: imageFile.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Failed to upload image:", uploadError.message);
    throw new Error(
      `Failed to upload image: ${uploadError.message}`
    );
  }

  // Get public image URL
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

  // ================= INSERT PROJECT =================

  const { error } = await supabase.from("proyek").insert({
    title,
    description,
    category,
    image: publicUrl,
    technologies,
    link,
  });

  if (error) {
    console.error("Failed to add project:", error.message);

    // Remove uploaded image if database insert fails
    await supabase.storage
      .from("project-images")
      .remove([filePath]);

    throw new Error(
      `Failed to add project: ${error.message}`
    );
  }

  revalidatePath("/admin/proyek");
  revalidatePath("/projects");
}

export default async function AdminProyekPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: daftarProyek, error: fetchError } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: true });

  if (fetchError) {
    console.error(
      "Failed to fetch projects:",
      fetchError.message
    );
  }

  const projectCount = daftarProyek?.length ?? 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-950">
      {/* ================= BACKGROUND ================= */}
      <div
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 space-y-12">
        {/* ================= HERO HEADER ================= */}
        <section className="border-b-2 border-slate-950 pb-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Abyannz. / Admin Panel
              </p>

              <span className="text-xs font-mono text-slate-400">
                2026 / 04
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-3">
                  CONTROL CENTER
                </p>

                <h1 className="text-5xl md:text-7xl font-black tracking-[-0.06em] leading-[0.9]">
                  PROJECT
                  <br />
                  <span className="text-slate-400">
                    MANAGEMENT.
                  </span>
                </h1>

                <p className="max-w-xl mt-6 text-sm md:text-base leading-7 text-slate-500">
                  Manage, update, and organize the projects
                  displayed across your portfolio through the
                  admin workspace.
                </p>
              </div>

              <div className="border-2 border-slate-950 bg-slate-950 text-white rounded-2xl p-6 min-w-[190px]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                  Total Projects
                </p>

                <p className="text-6xl font-black tracking-[-0.06em] mt-2">
                  {String(projectCount).padStart(2, "0")}
                </p>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-slate-400">
                    Active portfolio entries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ADMIN INFO ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-200 bg-white/90 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              Account
            </p>

            <p className="mt-3 text-sm font-semibold text-slate-900 break-all">
              {user?.email}
            </p>
          </div>

          <div className="border border-slate-200 bg-white/90 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              Database
            </p>

            <p className="mt-3 text-sm font-semibold text-slate-900">
              Supabase / proyek
            </p>
          </div>

          <div className="border border-slate-200 bg-white/90 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              Status
            </p>

            <p className="mt-3 text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Connected
            </p>
          </div>
        </section>

        {/* ================= PROJECT LIST ================= */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div className="flex gap-5 items-start">
              <span className="text-5xl md:text-6xl font-black tracking-[-0.08em] text-slate-200 leading-none">
                01
              </span>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Portfolio
                </p>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                  Your Projects
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-400 uppercase tracking-wider">
              {projectCount} entries / sorted by ID
            </p>
          </div>

          <div className="space-y-3">
            {daftarProyek?.map((proyek, index) => (
              <div
                key={proyek.id}
                className="group relative border border-slate-200 bg-white/90 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-950 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="grid grid-cols-[64px_1fr] md:grid-cols-[90px_1fr_auto] items-stretch">
                  <div className="flex items-center justify-center border-r border-slate-200 bg-slate-50 group-hover:bg-slate-950 transition-colors duration-300">
                    <span className="font-mono text-xs text-slate-400 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                        {proyek.title}
                      </h3>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500">
                        {proyek.category}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 line-clamp-1 mb-3">
                      {proyek.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {String(proyek.technologies)
                        .split(",")
                        .map((tech, techIndex) => (
                          <span
                            key={`${proyek.id}-${techIndex}`}
                            className="text-[10px] uppercase tracking-wider text-slate-400"
                          >
                            {tech.trim()}
                            {techIndex <
                              String(proyek.technologies).split(",")
                                .length -
                                1 && (
                              <span className="ml-2">/</span>
                            )}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-slate-200 p-4 md:p-5 flex items-center gap-2 md:flex-col md:justify-center">
                    <Link
                      href={`/admin/proyek/edit/${proyek.id}`}
                      className="flex-1 md:flex-none md:w-full text-center text-xs font-semibold uppercase tracking-wider border border-slate-300 bg-white text-slate-800 hover:bg-slate-950 hover:text-white hover:border-slate-950 px-4 py-2.5 rounded-xl transition-all"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/admin/proyek/hapus/${proyek.id}`}
                      className="flex-1 md:flex-none md:w-full text-center text-xs font-semibold uppercase tracking-wider border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 px-4 py-2.5 rounded-xl transition-all"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {(!daftarProyek ||
              daftarProyek.length === 0) && (
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-16 text-center">
                <p className="text-sm text-slate-400">
                  No projects found.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= CREATE PROJECT ================= */}
        <section className="pb-12">
          <div className="flex gap-5 items-start mb-6">
            <span className="text-5xl md:text-6xl font-black tracking-[-0.08em] text-slate-200 leading-none">
              02
            </span>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Database
              </p>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                Create New Project
              </h2>
            </div>
          </div>

          <div className="border-2 border-slate-950 rounded-3xl overflow-hidden bg-white">
            <div className="bg-slate-950 text-white px-6 md:px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                    New Entry
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    Add project to portfolio
                  </h3>
                </div>

                <span className="text-xs font-mono text-slate-500">
                  POST / proyek
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <form
                action={tambahProyekAction}
                className="space-y-7"
              >
                {/* Title + Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3"
                    >
                      Project Title
                    </label>

                    <input
                      id="title"
                      name="title"
                      required
                      placeholder="My New Project"
                      className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base font-medium text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-950"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3"
                    >
                      Category
                    </label>

                    <input
                      id="category"
                      name="category"
                      required
                      placeholder="Web Application"
                      className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base font-medium text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-950"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    placeholder="Describe your project..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-950 outline-none transition-all resize-none placeholder:text-slate-300 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label
                    htmlFor="technologies"
                    className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3"
                  >
                    Technologies
                  </label>

                  <input
                    id="technologies"
                    name="technologies"
                    required
                    placeholder="Next.js, Supabase, TypeScript"
                    className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base font-medium text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-950"
                  />
                </div>

                {/* Image + Link */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* IMAGE UPLOAD */}
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3"
                    >
                      Project Image
                    </label>

                    <ImageUploadField />
                  </div>

                  {/* PROJECT LINK */}
                  <div>
                    <label
                      htmlFor="link"
                      className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3"
                    >
                      Project Link
                    </label>

                    <input
                      id="link"
                      name="link"
                      type="url"
                      placeholder="https://example.vercel.app"
                      className="w-full border-0 border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-medium text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-slate-950"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <p className="text-xs text-slate-400 max-w-sm">
                    The selected image will be uploaded to
                    Supabase Storage and automatically connected
                    to this project.
                  </p>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-700 active:scale-[0.98]"
                  >
                    Add Project

                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}