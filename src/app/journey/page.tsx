import Navbar from "@/components/Navbar";

export default function Journey() {
  return (
    <main className="journey-page">
      <Navbar />

      {/* =========================
          03 — MY JOURNEY
      ========================= */}

      <section className="journey-section journey-timeline">

        <div className="journey-heading-row">

          <div>
            <div className="journey-label">
              <span>03</span>
              <i></i>
              MY JOURNEY
            </div>

            <h1>
              My journey
              <br />
              <em>so far.</em>
            </h1>
          </div>

          <p className="journey-intro">
            Tracing the chronological cadence of discipline,
            development paradigms, and extracurricular leadership.
          </p>

        </div>


        {/* TIMELINE */}

        <div className="timeline">

          <div className="timeline-line"></div>

          {/* 2024 */}

          <article className="timeline-item">

            <div className="timeline-dot">
              <span></span>
            </div>

            <small>2024</small>

            <h2>Genesis</h2>

            <p>
              Start exploring web development, the fundamentals of algorithms, and modern programming.
            </p>

          </article>


          {/* 2025 */}

          <article className="timeline-item">

            <div className="timeline-dot dark">
              <span></span>
            </div>

            <small>2025</small>

            <h2>Construction</h2>

            <p>
              Start creating real projects and delving into the modern frontend ecosystem based on components.
            </p>

          </article>


          {/* 2026 */}

          <article className="timeline-item">

            <div className="timeline-dot">
              <span></span>
            </div>

            <small>2026 — PRESENT</small>

            <h2>Refinement</h2>

            <p>
              Currently continuously improving capabilities in Next.js,
              Tailwind CSS, UI/UX architecture, and full-stack agility.
            </p>

          </article>


          {/* PASKIBRA */}

          <article className="timeline-item">

            <div className="timeline-dot grey">
              <span></span>
            </div>

            <small>DISCIPLINE</small>

            <h2>Paskibra</h2>

            <p>
              Member of the school's Paskibra unit; honing leadership,
              drill formations, and mental resilience.
            </p>

          </article>


          {/* LKBB */}

          <article className="timeline-item">

            <div className="timeline-dot">
              <span></span>
            </div>

            <small>CONQUEST</small>

            <h2>LKBB / LPBB</h2>

            <p>
              Actively participated in regional drill competitions and fostered team cohesion within the contingent.
            </p>

          </article>

        </div>

      </section>


      {/* =========================
          04 — ACHIEVEMENTS
      ========================= */}

      <section className="journey-section achievements-section">

        <div className="achievements-heading">

          <div>

            <div className="journey-label">
              <span>04</span>
              <i></i>
              ACHIEVEMENTS & MEMORIES
            </div>

            <h1>
              Achievements &
              <br />
              <em>Memories.</em>
            </h1>

          </div>


          <div className="moments-card">

            <small>PERSPECTIVE</small>

            <h2>
              MOMENTS THAT
              <br />
              SHAPE ME.
            </h2>

            <p>
              Certificates, competition documentation, and valuable moments
              throughout my journey of pushing the boundaries of discipline
              and technology.
            </p>

            <a href="/journey/archives">
                VIEW ALL ARCHIVES
            <span>→</span>
            </a>

          </div>

        </div>


        {/* =========================
            MEMORY CARDS
        ========================= */}

        <div className="memory-grid" id="memories">


          {/* 01 — PRAMUKA */}

          <article className="memory-card">

            <div className="memory-image">

              <img
                src="/images/pramukasmkn1pasuruan.jpeg"
                alt="Kegiatan Pramuka"
              />

              <span>PRAMUKA</span>

            </div>

            <div className="memory-info">

              <small>SCOUT ACTIVITIES</small>

              <h2>Moving Forward Together</h2>

              <p>
                Experience in organizing, working in teams,
                and building discipline through Scout activities.
              </p>

            </div>

          </article>


          {/* 02 — PASKIB */}

          <article className="memory-card">

            <div className="memory-image">

              <img
                src="/images/Paskib.jpeg"
                alt="Kegiatan Paskib"
              />

              <span>PASKIBRA</span>

            </div>

            <div className="memory-info">

              <small>PASKIBRA EXPERIENCE</small>

              <h2>Definition of Precision</h2>

              <p>
                Moments of togetherness and discipline in drill activities and character building.
              </p>

            </div>

          </article>


          {/* 03 — SERTIFIKAT */}

          <article className="memory-card">

            <div className="memory-image certificate-memory">

              <img
                src="/images/sertifikat2.jpeg"
                alt="Sertifikat prestasi"
              />

              <span>ACHIEVEMENT</span>

            </div>

            <div className="memory-info">

              <small>COMPETITION 2026</small>

              <h2>Proof of Dedication</h2>

              <p>
                Certificate of recognition for achievements in
                LPBB competitions and competitive experiences.
              </p>

            </div>

          </article>


          {/* 04 — MENDAKI */}

          <article className="memory-card">

            <div className="memory-image">

              <img
                src="/images/bukitcendono.jpeg"
                alt="Mendaki Bukit Cendono"
              />

              <span>EXPEDITION</span>

            </div>

            <div className="memory-info">

              <small>NATURE & HORIZON</small>

              <h2>Space for Reflection</h2>

              <p>
                Enjoying the journey, nature, and challenges to
                discover new perspectives beyond routine.
              </p>

            </div>

          </article>

        </div>

      </section>


      {/* =========================
          05 — LET'S CONNECT
      ========================= */}

      <section className="journey-section connect-section">

        <div className="connect-content">

          <div>

            <div className="journey-label">
              <span>05</span>
              <i></i>
              LET'S CONNECT
            </div>

            <h1>
              Let's build
              <br />
              <em>something</em>
              <br />
              together.
            </h1>

            <p className="connect-description">
              Open to collaborating on modern frontend projects,
              exploring interactive design, discussing student leadership,
              and other digital synergies.
            </p>


            {/* CONTACT DETAILS */}

            <div className="contact-details">

              {/* EMAIL */}

              <div className="email-contact">

                <small>DIRECT EMAIL</small>

                <a href="mailto:abyansudjatmiko00@gmail.com">
                  abyansudjatmiko00@gmail.com
                  <span>↗</span>
                </a>

              </div>


              {/* INSTAGRAM */}

              <div className="instagram-contact">

                <small>INSTAGRAM</small>

                <a
                  href="https://instagram.com/bian.rxv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @bian.rxv
                  <span>↗</span>
                </a>

              </div>

            </div>

          </div>


          {/* =========================
    PRIMARY CHANNELS
========================= */}

<div className="channels-card">

  <div className="channels-header">
    <span>PRIMARY CHANNELS</span>
    <i></i>
  </div>

  {/* EMAIL */}
  <a
    href="mailto:abyansudjatmiko00@gmail.com"
    className="channel"
  >
    <span className="channel-icon">✉</span>

    <span className="channel-name">
      SEND ME AN EMAIL
    </span>

    <strong className="channel-action">
      MESSAGE →
    </strong>
  </a>

  {/* INSTAGRAM */}
  <a
    href="https://instagram.com/bian.rxv"
    target="_blank"
    rel="noopener noreferrer"
    className="channel"
  >
    <span className="channel-icon">◎</span>

    <span className="channel-name">
      INSTAGRAM
    </span>

    <strong className="channel-action">
      VISIT PROFILE →
    </strong>
  </a>

  {/* TIKTOK */}
  <a
    href="https://www.tiktok.com/@bian.rxv"
    target="_blank"
    rel="noopener noreferrer"
    className="channel"
  >
    <span className="channel-icon">♪</span>

    <span className="channel-name">
      TIKTOK
    </span>

    <strong className="channel-action">
      VISIT PROFILE →
    </strong>
  </a>

  {/* GITHUB */}
  <div className="channel disabled">
    <span className="channel-icon">&lt;&gt;</span>

    <span className="channel-name">
      GITHUB ARCHIVE
    </span>

    <strong className="channel-action">
      COMING SOON
    </strong>
  </div>

  {/* LINKEDIN */}
  <div className="channel disabled">
    <span className="channel-icon">□</span>

    <span className="channel-name">
      LINKEDIN PROFILE
    </span>

    <strong className="channel-action">
      COMING SOON
    </strong>
  </div>

  <p className="response-time">
    OPEN FOR CREATIVE COLLABORATION & DIGITAL PROJECTS.
  </p>

</div>


        </div>

      </section>


      {/* =========================
          BOTTOM INFO
      ========================= */}

      <div className="journey-bottom-bar">

        <div>

          <strong>ABYANNZ.</strong>

          <span>•</span>

          <span>
            Web Developer & Creative Technologist
          </span>

          <span>•</span>

          <span>
            SMK Negeri 1 Pasuruan
          </span>

        </div>


        <div className="journey-page-number">

          <span>04</span>

          <span>/ 04</span>

          <i></i>

        </div>

      </div>


      {/* FOOTER */}

      <footer className="journey-footer">

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