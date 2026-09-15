import Link from "next/link";
import { notFound } from "next/navigation";
import { proyek } from "@/data/proyek";
import Navbar from "@/components/Navbar";

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetail({
  params,
}: ProjectDetailProps) {
  const { id } = await params;
  const project = proyek.find((item) => item.id === Number(id));

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html:not(.dark) .project-detail-title {
              color: #0f172a !important;
            }

            html.dark .project-detail-title {
              color: #f8fafc !important;
            }
          `,
        }}
      />

      <main className="min-h-screen px-5 pb-20 pt-10 text-slate-900 dark:text-slate-100 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-12 flex items-center justify-between gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Back to Projects
            </Link>

            <span className="hidden text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 sm:block dark:text-slate-500">
              Project Archive / 0{project.id}
            </span>
          </div>

          {/* Project heading */}
          <section className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                {project.category}
              </p>

              <h1 className="project-detail-title max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-7xl lg:text-8xl dark:text-slate-100">
                {project.title}
                <span className="text-sky-400">.</span>
              </h1>
            </div>

            <div className="max-w-xs border-l border-slate-300 pl-5 text-sm leading-6 text-slate-500 dark:border-slate-700 dark:text-slate-400">
              A closer look at the purpose, visual direction, and technology
              behind this project.
            </div>
          </section>

          {/* Main preview */}
          <section className="relative mb-16">
            <div className="absolute -left-3 -top-3 h-16 w-16 border-l border-t border-sky-400/70" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-sky-400/70" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-2 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)] md:p-4">
              <div className="mb-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {project.title} / Preview
                </span>
                <span className="text-xs text-slate-400">↗</span>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                <img
                  src={project.image}
                  alt={`Preview ${project.title}`}
                  className="block h-auto w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Information */}
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article className="rounded-[2rem] border border-slate-200/80 bg-white/65 p-7 backdrop-blur md:p-10 dark:border-slate-700/80 dark:bg-slate-900/55">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-sky-500">
                  01
                </span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Project overview
                </span>
              </div>

              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                Designed with purpose<span className="text-sky-400">.</span>
              </h2>

              <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg dark:text-slate-300">
                {project.description}
              </p>

              <div className="mt-8 grid gap-5 border-t border-slate-200 pt-7 dark:border-slate-700 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
                    Project type
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {project.category}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
                    Project focus
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    User experience, structure, and practical functionality
                  </p>
                </div>
              </div>
            </article>

            <aside className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-sky-500">
                  02
                </span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              </div>

              <h2 className="mb-5 text-2xl font-bold">
                Technologies<span className="text-sky-400">.</span>
              </h2>

              <div className="mb-8 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600 dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-full bg-sky-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-sky-600"
                >
                  <span>Visit live website</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              )}
            </aside>
          </section>

          {/* Bottom navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-slate-300 pt-6 text-sm dark:border-slate-700">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full border border-sky-300 bg-sky-500 px-5 py-3 font-bold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30 dark:border-sky-400 dark:bg-sky-500 dark:hover:bg-sky-400"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>All projects</span>
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Abyannz. / Portfolio
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
