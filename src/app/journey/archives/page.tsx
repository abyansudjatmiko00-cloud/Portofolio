import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Archives() {
  return (
    <main className="archives-page">

      <Navbar />

      {/* HEADER */}

      <section className="archives-header">

        <div className="archives-label">
          <span>ARCHIVE</span>
          <i></i>
          MEMORY COLLECTION
        </div>

        <div className="archives-heading">

          <div>
            <h1>
              Memories
              <br />
              <em>& Archives.</em>
            </h1>
          </div>

          <p>
              Kumpulan dokumentasi perjalanan, kegiatan,
              pengalaman, dan pencapaian yang menjadi bagian
              dari perjalanan saya.
          </p>

        </div>

        <Link href="/journey" className="archives-back">
          ← BACK TO JOURNEY
        </Link>

      </section>


      {/* ARCHIVE GRID */}

      <section className="archives-grid">


        {/* PRAMUKA */}

        <article className="archive-item">

          <div className="archive-image">
            <img
              src="/images/pramukasmkn1pasuruan.jpeg"
              alt="Kegiatan Pramuka"
            />
          </div>

          <div className="archive-meta">
            <span>01</span>
            <small>SCOUT ACTIVITIES</small>
          </div>

          <h2>Moving Forward Together</h2>

          <p>
            Documentation of Scout activities and experiences
            in building teamwork, discipline, and camaraderie.
          </p>

        </article>


        {/* PASKIB */}

        <article className="archive-item">

          <div className="archive-image">
            <img
              src="/images/paskib.jpeg"
              alt="Kegiatan Paskib"
            />
          </div>

          <div className="archive-meta">
            <span>02</span>
            <small>PASKIBRA EXPERIENCE</small>
          </div>

          <h2>Definition of Precision</h2>

          <p>
            Documentation of experiences involving marching drills,
            discipline, and character building.
          </p>

        </article>


        {/* SERTIFIKAT */}

        <article className="archive-item">

          <div className="archive-image certificate-archive">
            <img
              src="/images/sertifikat2.jpeg"
              alt="Sertifikat prestasi"
            />
          </div>

          <div className="archive-meta">
            <span>03</span>
            <small>ACHIEVEMENT</small>
          </div>

          <h2>Evidence of Dedication</h2>

          <p>
            Certificate of recognition for achievements in
            LPBB competitions and competitive experiences.
          </p>

        </article>


        {/* MENDAKI */}

        <article className="archive-item">

          <div className="archive-image">
            <img
              src="/images/bukitcendono.jpeg"
              alt="Mendaki Bukit Cendono"
            />
          </div>

          <div className="archive-meta">
            <span>04</span>
            <small>NATURE & HORIZON</small>
          </div>

          <h2>Space for Reflection</h2>

          <p>
            Documentation of the journey climbing Mount Cendono
            and the experience of enjoying nature and facing challenges
            outside of routine.
          </p>

        </article>

      </section>


      {/* FOOTER */}

      <footer className="archives-footer">

        <div>
          <strong>ABYANNZ.</strong>
          <span>•</span>
          <span>MEMORY ARCHIVE</span>
        </div>

        <div>
          © 2026 ABYANNZ. ALL RIGHTS RESERVED.
        </div>

      </footer>

    </main>
  );
}