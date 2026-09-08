"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    if (isTransitioning) return;

    const newTheme = !darkMode;
    const root = document.documentElement;

    setIsTransitioning(true);
    root.classList.add("theme-changing");

    setTimeout(() => {
      setDarkMode(newTheme);

      if (newTheme) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }, 180);

    setTimeout(() => {
      root.classList.remove("theme-changing");
      setIsTransitioning(false);
    }, 720);
  };

  return (
    <header className="navbar">

      <Link href="/" className="navbar-logo">
        ABYANNZ.
      </Link>

      <nav className={`navbar-menu ${menuOpen ? "mobile-open" : ""}`}>
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
        >
          HOME
        </Link>

        <Link
          href="/about"
          className={pathname === "/about" ? "active" : ""}
        >
          ABOUT
        </Link>

        <Link
          href="/projects"
          className={pathname === "/projects" ? "active" : ""}
        >
          PROJECTS
        </Link>

        <Link
          href="/journey"
          className={pathname === "/journey" ? "active" : ""}
        >
          JOURNEY
        </Link>
      </nav>

      <div className="navbar-actions">

        <button
          type="button"
          className={`theme-toggle ${darkMode ? "dark-active" : ""}`}
          onClick={toggleTheme}
          disabled={isTransitioning}
          aria-label={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          title={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
        >
          <span className="theme-sun">☼</span>
          <span className="theme-moon">☾</span>
        </button>

        <button
          type="button"
          className={`profile-button ${menuOpen ? "menu-active" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="menu-icon">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>

      </div>

    </header>
  );
}