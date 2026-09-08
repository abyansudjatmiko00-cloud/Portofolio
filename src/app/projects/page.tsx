import Navbar from "@/components/Navbar";

export default function Projects() {
  return (
    <main className="projects-page">

      {/* =========================
          NAVIGATION
      ========================= */}

      <Navbar />


      {/* =========================
          03 — SELECTED WORK
      ========================= */}

      <section className="projects-content">

        {/* TOP LABEL */}

        <div className="projects-top">

          <div className="projects-section-label">
            <span>03</span>
            <i></i>
            SELECTED WORK
          </div>

          <div className="projects-archive">
            ARCHIVE — 2024 / 2026
            <span>•</span>
            <strong>DISCIPLINE: INTERACTIVE & DIGITAL</strong>
          </div>

        </div>


        {/* =========================
            INTRO
        ========================= */}

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
              A collection of projects I have worked on during my learning journey and while developing skills in web
              development, UI/UX, and modern technologies.
            </p>

          </div>

        </div>


        {/* =========================
            PROJECT LIST
        ========================= */}

        <div
          className="projects-grid"
          id="project-list"
        >

          {/* =========================
              PROJECT 01 — SIMMAG
          ========================= */}

          <article className="project-item">

            <div className="project-image">

              <img
                src="/images/projects/webmagang.png"
                alt="SIMMAG Project"
              />

              <span className="project-image-label">
                PROD // 2026
              </span>

            </div>


            <div className="project-info">

              <div className="project-meta">

                <span>01</span>

                <small>
                  WEB APPLICATION
                </small>

              </div>


              <h2>
                SIMMAG
              </h2>


              <p>
                Student Internship Management Information System
                designed to assist schools, supervising teachers,
                and students in managing internship activities
                more easily and in a structured manner.
              </p>


              <div className="project-bottom">

                <div className="project-tech">

                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>TypeScript</span>
                  <span>Tailwind CSS</span>

                </div>


                <a
                  href="https://simmag-byn.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  VIEW PROJECT
                  <span>↗</span>
                </a>

              </div>

            </div>

          </article>


          {/* =========================
              PROJECT 02 — PORTFOLIO
          ========================= */}

          <article className="project-item">

            <div className="project-image">

              <img
                src="/images/projects/webportofolio.png"
                alt="Personal Portfolio"
              />

              <span className="project-image-label">
                PORTFOLIO
              </span>

            </div>


            <div className="project-info">

              <div className="project-meta">

                <span>02</span>

                <small>
                  WEB DEVELOPMENT
                </small>

              </div>


              <h2>
                Personal Portfolio
              </h2>


              <p>
                  Website portfolio pribadi untuk memperkenalkan
                  identitas, kemampuan, pengalaman, dan berbagai
                  project yang pernah saya kerjakan.
              </p>


              <div className="project-bottom">

                <div className="project-tech">

                  <span>Next.js</span>
                  <span>Tailwind CSS</span>

                </div>


                <a
                  href="/"
                  className="project-link"
                >
                  VIEW PROJECT
                  <span>↗</span>
                </a>

              </div>

            </div>

          </article>

        </div>


        {/* =========================
            BOTTOM NAVIGATION
        ========================= */}

        <div className="projects-navigation">

          <div className="projects-progress">

            <strong>03</strong>

            <span>/</span>

            <span>04</span>

            <div className="progress-line">
              <i></i>
            </div>

            <small>
              PROJECT ARCHIVE • SELECTED WORKS
            </small>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

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