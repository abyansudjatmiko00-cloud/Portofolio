import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string | string[] | null;
  link?: string | null;
}

function formatTechnologies(
  technologies: string | string[] | null
): string[] {
  if (!technologies) return [];

  if (Array.isArray(technologies)) {
    return technologies;
  }

  return technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

export default async function Projects() {
  const { data: proyek, error } = await supabase
    .from("proyek")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  const projects: Project[] = proyek ?? [];

  return (
    <main className="projects-page">
      {/* NAVIGATION */}
      <Navbar />

      {/* SELECTED WORK */}
      <section className="projects-content">
        {/* TOP LABEL */}
        <div className="projects-top">
          <div className="projects-archive">
            ARCHIVE — 2024 / 2026
            <span>•</span>
            <strong>DISCIPLINE: INTERACTIVE & DIGITAL</strong>
          </div>
        </div>

        {/* INTRO */}
        <div className="projects-intro">
          <div className="projects-heading">
            <h1>
              My Recent
              <br />
              Projects.
            </h1>

            <p>
              Some of the projects I have worked on.
              <br />
              <em>Always learning, always growing.</em>
            </p>

            <a
              href="#project-list"
              className="view-all-projects"
            >
              VIEW ALL PROJECTS
              <span>↓</span>
            </a>
          </div>

          <div className="curatorial-note">
            <span>CURATORIAL NOTE</span>

            <p>
              A collection of projects I have worked on during my
              learning journey and while developing skills in web
              development, UI/UX, and modern technologies.
            </p>
          </div>
        </div>

        {/* PROJECT LIST */}
        <div
          className="projects-grid"
          id="project-list"
        >
          {projects.map((project, index) => {
            const technologies = formatTechnologies(
              project.technologies
            );

            return (
              <article
                className="project-item"
                key={project.id}
              >
                {/* IMAGE */}
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    width={1600}
                    height={900}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />

                  <span className="project-image-label">
                    {project.category.toUpperCase()} // 2026
                  </span>
                </div>

                {/* INFORMATION */}
                <div className="project-info">
                  <div className="project-meta">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <small>
                      {project.category.toUpperCase()}
                    </small>
                  </div>

                  <h2>{project.title}</h2>

                  <p>{project.description}</p>

                  <div className="project-bottom">
                    {/* TECHNOLOGIES */}
                    <div className="project-tech">
                      {technologies.map((technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* DYNAMIC ROUTING */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="project-link"
                    >
                      VIEW PROJECT
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="projects-navigation">
          <div className="projects-progress">
            <small>
              PROJECT ARCHIVE • SELECTED WORKS
            </small>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="projects-footer">
        <div>
          <strong>
            MUHAMMAD ABYAN SUDJATMIKO
          </strong>

          <span>•</span>

          <span>
            Web Developer & Creative Technologist
          </span>
        </div>

        <div>
          © 2026 ABYANNZ. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}