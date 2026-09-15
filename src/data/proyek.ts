export interface Proyek {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  link?: string;
}

export const proyek: Proyek[] = [
  {
    id: 1,
    title: "SIMMAG",
    description:
      "SIMMAG is a Student Internship Management Information System designed to help schools, supervising teachers, and students organize and manage internship activities in a more structured, efficient, and accessible way. The platform presents internship-related information in a clear digital workspace, helping users keep track of important activities and making the overall internship management process easier to understand and coordinate.",
    category: "Web Application",
    image: "/images/projects/webmagang.png",
    technologies: [
      "Next.js",
      "Supabase",
      "TypeScript",
      "Tailwind CSS",
    ],
    link: "https://simmag-byn.vercel.app/",
  },

  {
    id: 2,
    title: "Personal Portfolio",
    description:
      "This personal portfolio website is designed to introduce my identity, technical abilities, learning journey, and selected projects in one cohesive digital experience. It combines a clean editorial layout with interactive navigation, responsive sections, and a consistent visual system to present my work, interests, and development progress in a professional yet personal way.",
    category: "Web Development",
    image: "/images/projects/webportofolio.png",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
    ],
    link: "https://portofolio-abyanzz.vercel.app/",
  },

  {
    id: 3,
    title: "Library Website",
    description:
      "The Library Website is a digital library platform created to make book information easier to explore and access. It provides organized book categories, a search experience for finding specific titles, and dedicated book detail pages that present relevant information in a clearer format. The project focuses on simple navigation, structured content, and a practical reading-oriented user experience.",
    category: "Web Application",
    image: "/images/projects/perpustakaan.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    link: "https://perpustakaan-byn.vercel.app/perpustakaan",
  },
];
