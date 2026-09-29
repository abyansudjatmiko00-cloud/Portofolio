import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";

async function tambahProyekAction(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const technologies = formData.get("technologies") as string;
  const link = (formData.get("link") as string) || null;

  const { error } = await supabase.from("proyek").insert({
    title,
    description,
    category,
    image,
    technologies,
    link,
  });

  if (error) {
    console.error("Failed to add project:", error.message);
    throw new Error(`Failed to add project: ${error.message}`);
  }

  revalidatePath("/admin/proyek");
  revalidatePath("/projects");
}

export default async function AdminProyekPage() {
  const supabase = await createSupabaseServerClient();

  // Get currently logged-in admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: daftarProyek, error: fetchError } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: true });

  if (fetchError) {
    console.error("Failed to fetch projects:", fetchError.message);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
  <h1 className="text-2xl font-bold text-slate-800">
    Project Management
  </h1>

  <p className="text-sm text-blue-600 font-medium mt-1">
    Welcome, {user?.email}
  </p>

  <p className="text-sm text-slate-500 mt-1">
    Manage the projects displayed on your portfolio.
  </p>
</div>

      {/* Project List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Title
              </th>

              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Category
              </th>

              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Technologies
              </th>

              <th className="text-left px-4 py-3 font-medium text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {daftarProyek?.map((proyek) => (
              <tr key={proyek.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-800 font-medium">
                  {proyek.title}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {proyek.category}
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {proyek.technologies}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/proyek/edit/${proyek.id}`}
                      className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/admin/proyek/hapus/${proyek.id}`}
                      className="text-xs bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {(!daftarProyek || daftarProyek.length === 0) && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Project */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Add New Project
        </h2>

        <form action={tambahProyekAction} className="space-y-4">
          {/* Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
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
              required
              rows={4}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Technologies */}
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
              placeholder="Next.js, Supabase, TypeScript"
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
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
              placeholder="/images/projects/example.png"
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Link */}
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
              placeholder="https://example.vercel.app"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}