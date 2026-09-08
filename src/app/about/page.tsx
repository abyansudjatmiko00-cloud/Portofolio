import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <main className="about-page-wrapper">
      <Navbar />

      {/* =========================
          ABOUT PAGE
      ========================= */}

      <section className="about-page">

        {/* =========================
            ABOUT HEADER
        ========================= */}

        <div className="about-header">
          <div className="about-section-label">
            <span>-</span>
            <span className="about-dot"></span>
            ABOUT ME
          </div>

        </div>


        {/* =========================
            ABOUT MAIN
        ========================= */}

        <div className="about-main">

          {/* =========================
              LEFT IMAGE
          ========================= */}

          <div className="about-visual">

            <div className="about-photo">

              <div className="about-photo-tape"></div>

              <img
                src="/images/preman.jpeg"
                alt="About Abyan"
              />

              <div className="about-photo-caption">
                <span>
                  PLATE NO. 04 — FLIGHT & HORIZON
                </span>

                <span>
                  PASURUAN, ID
                </span>
              </div>

            </div>

          </div>


          {/* =========================
              RIGHT CONTENT
          ========================= */}

          <div className="about-details">

            <h1>
              A little bit
              <br />
              <em>about me.</em>
            </h1>


            {/* =========================
                DESCRIPTION
            ========================= */}

            <div className="about-description">

              <p>
                I am a student interested in web development and enjoy creating modern, simple, and user-friendly web interfaces.
              </p>

              <p>
                I am interested in programming because I can turn ideas into websites or applications that others can use. I find beauty in clean code and precise user interface structures.
              </p>

            </div>


            {/* =========================
                SIGNATURE
            ========================= */}

            <div className="about-signature">
              <span>Abyan</span>

              <small>
                ↗ CREATIVE AUTOGRAPH
              </small>
            </div>


            {/* =========================
                PROFILE DOSSIER
            ========================= */}

            <div className="profile-dossier">

              <div className="dossier-header">

                <strong>
                  PROFILE DOSSIER
                </strong>

                <span>
                  INDEX / 2025
                </span>

              </div>


              <div className="dossier-grid">

                {/* NAME */}

                <div className="dossier-item">
                  <small>NAME</small>

                  <strong>
                    Muhammad Abyan Sudjatmiko
                  </strong>
                </div>


                {/* NICKNAME */}

                <div className="dossier-item">
                  <small>NICKNAME</small>

                  <strong>
                    Abyan ·
                  </strong>
                </div>


                {/* ROLE */}

                <div className="dossier-item">
                  <small>ROLE</small>

                  <strong className="blue-text">
                    Web Developer
                  </strong>
                </div>


                {/* EDUCATION */}

                <div className="dossier-item">
                  <small>EDUCATION</small>

                  <strong>
                    SMK Negeri 1 Pasuruan
                  </strong>
                </div>


                {/* MAJOR */}

                <div className="dossier-item">
                  <small>MAJOR</small>

                  <strong>
                    Rekayasa Perangkat Lunak
                  </strong>
                </div>


                {/* FOCUS */}

                <div className="dossier-item">
                  <small>FOCUS</small>

                  <div className="focus-tags">
                    <span>Web Dev</span>
                    <span>UI / UX</span>
                    <span>Clean Code</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            MOVING MARQUEE
            DILETAKKAN DI LUAR ABOUT-MAIN
            AGAR FULL WIDTH DAN TIDAK MENDORONG KOLOM
        ===================================================== */}

        <div className="about-marquee">

          <div className="about-marquee-track">

            <span>WEB DEVELOPER</span>
            <i>✦</i>

            <span>UI / UX DESIGN</span>
            <i>✦</i>

            <span>NEXT.JS</span>
            <i>✦</i>

            <span>FIGMA</span>
            <i>✦</i>

            <span>PYTHON</span>
            <i>✦</i>

            <span>ALWAYS LEARNING</span>
            <i>✦</i>


            {/* DUPLIKAT UNTUK LOOP */}

            <span>WEB DEVELOPER</span>
            <i>✦</i>

            <span>UI / UX DESIGN</span>
            <i>✦</i>

            <span>NEXT.JS</span>
            <i>✦</i>

            <span>FIGMA</span>
            <i>✦</i>

            <span>PYTHON</span>
            <i>✦</i>

            <span>ALWAYS LEARNING</span>
            <i>✦</i>


            {/* DUPLIKAT KEDUA AGAR TIDAK KOSONG SAAT BERJALAN */}

            <span>WEB DEVELOPER</span>
            <i>✦</i>

            <span>UI / UX DESIGN</span>
            <i>✦</i>

            <span>NEXT.JS</span>
            <i>✦</i>

            <span>FIGMA</span>
            <i>✦</i>

            <span>PYTHON</span>
            <i>✦</i>

            <span>ALWAYS LEARNING</span>
            <i>✦</i>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="about-footer">

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