import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HomeFocus from "@/components/HomeFocus";

export default function Home() {
  return (
    <main className="home-page">
      <Navbar />
      <Hero />
      <HomeFocus />
      <Footer />
    </main>
  );
}
