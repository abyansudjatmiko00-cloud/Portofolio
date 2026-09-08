export default function Hero() {
  return (
    <section className="hero">

      {/* BACKGROUND DECORATION */}
      <div className="hero-big-a">A</div>

      <div className="hero-cloud cloud-1"></div>
      <div className="hero-cloud cloud-2"></div>

      <div className="hero-led led-1"></div>
      <div className="hero-led led-2"></div>
      <div className="hero-led led-3"></div>

      {/* LEFT CONTENT */}
      <div className="hero-content">

        <div className="hero-topline">
          <span className="hero-topline-dot"></span>
          <span className="hero-topline-main">WELCOME TO MY</span>
          <small>PORTFOLIO</small>
        </div>

        <h1>
          MUHAMMAD
          <br />
          ABYAN
          <br />
          SUDJATMIKO
        </h1>

        {/* SCRIPT — CUMA SATU */}
        <div className="hero-script">
          Web Developer
        </div>

        <div className="hero-role">
          <span></span>
          WEB DEVELOPER & CREATIVE TECHNOLOGIST
        </div>

        <p className="hero-description">
          I am a Software Engineering student interested in web development, UI/UX, and modern technologies. I build digital spaces that balance structural precision with visual sensitivity.
        </p>

        <div className="hero-buttons">
          <a href="/projects" className="button-primary">
            EXPLORE MY WORK →
          </a>

          <a href="/journey" className="button-secondary">
            LET&apos;S TALK ↗
          </a>
        </div>

        <div className="field-notes">
          <div className="field-notes-title">
            ↗ FIELD NOTES
          </div>

          <p>
            “still learning.
            <br />
            still building.
            <br />
            still finding my way.”
          </p>
        </div>

      </div>

      {/* RIGHT PORTRAIT */}
      <div className="hero-image">

        <div className="portrait-frame">

          <div className="portrait-label">
            FIG. 01 — ARCHIVE 2025
          </div>

          <img
            src="/images/abkece.jpeg"
            alt="Muhammad Abyan Sudjatmiko"
            className="portrait"
          />

          <div className="image-info">

            <div>
              <small>SUBJECT</small>
              <strong>M. Abyan Sudjatmiko</strong>
            </div>

            <div>
              <small>FOCUS</small>
              <strong>Web Developer</strong>
            </div>

          </div>

        </div>

        <div className="image-meta">
          <span>-</span>
          <span>MONOCHROME / 01</span>
        </div>

        <div className="build-text">
          Build
          <br />
          Better
          <br />
          Web
        </div>

      </div>

      {/* SCROLL */}
      <div className="scroll-explore">
        ↓ &nbsp; SCROLL TO EXPLORE
      </div>

    </section>
  );
}