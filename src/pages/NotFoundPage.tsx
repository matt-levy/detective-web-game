import "./placeholder-page.scss";

import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="public-shell">
      <section className="placeholder-page">
        <p className="placeholder-page__eyebrow">404</p>
        <h1 className="placeholder-page__title">File not found</h1>
        <p className="placeholder-page__copy">
          The route does not exist in the archive yet.
        </p>
        <Link className="shell-link shell-link--prominent" to="/">
          Return To Start
        </Link>
      </section>
    </main>
  );
}
