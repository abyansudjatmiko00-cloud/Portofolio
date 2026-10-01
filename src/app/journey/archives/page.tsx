import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface Memory {
  id: number;
  category: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

export default async function Archives() {
  const { data: memories } = await supabase
    .from("memories")
    .select("*")
    .order("id", { ascending: true });

  const memoryData: Memory[] = memories ?? [];

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
        {memoryData.map((memory, index) => (
          <article className="archive-item" key={memory.id}>
            <div
              className={`archive-image ${
                memory.category === "ACHIEVEMENT"
                  ? "certificate-archive"
                  : ""
              }`}
            >
              <img
                src={memory.image}
                alt={memory.title}
              />
            </div>

            <div className="archive-meta">
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <small>{memory.label}</small>
            </div>

            <h2>{memory.title}</h2>

            <p>{memory.description}</p>
          </article>
        ))}
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