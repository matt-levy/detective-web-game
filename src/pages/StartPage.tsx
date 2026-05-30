import "./start-page.scss";

import { Link } from "react-router-dom";

export function StartPage() {
  return (
    <section className="start-page">
      <div className="start-page__panel">
        <p className="start-page__eyebrow">Municipal investigations bureau</p>
        <h1 className="start-page__title">Detective Web Game</h1>
        <p className="start-page__lede">
          Step into a paper-heavy noir archive, reopen active files, and test
          theories against witness statements, physical evidence, and false alibis.
        </p>

        <div className="start-page__actions">
          <Link className="shell-link shell-link--prominent" to="/login">
            Sign In To Continue
          </Link>
          <Link className="shell-link" to="/cases/bellweather">
            Jump To Demo Case
          </Link>
        </div>
      </div>
    </section>
  );
}
