import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-background" />
      <div className="not-found-noise" />

      <section className="not-found-content">
        <p className="not-found-label">⚠️ ERROR / 404 🥲</p>

        <h1 className="not-found-number">404</h1>

        <div className="not-found-divider" />

        <h2 className="not-found-title">
          Oops! Page not found 😵‍💫
        </h2>

        <p className="not-found-description">
          Uh-oh! The page you are looking for cannot be found 🚀
          <br />
          It may have been moved, deleted, or the URL might be incorrect 🔍
        </p>

        <div className="not-found-actions">
          <Link
            href="/"
            className="not-found-button not-found-button-primary"
          >
            🏠 Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}