import "./login-page.scss";

import { useState, type SubmitEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "../components";

const getRedirectTarget = (search: string) => {
  const params = new URLSearchParams(search);
  return params.get("redirect") || "/cases/bellweather";
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("investigator@precinct.local");
  const [password, setPassword] = useState("casefiles");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(getRedirectTarget(location.search), { replace: true });
  };

  return (
    <section className="login-page">
      <div className="login-page__panel">
        <p className="login-page__eyebrow">Restricted archive access</p>
        <h1 className="login-page__title">Sign In</h1>
        <p className="login-page__lede">
          This is now just a local prototype entry screen. Backend and API scaffolding
          have been removed so you can learn that layer separately.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form__field">
            <span>Email</span>
            <input
              autoComplete="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>

          <label className="login-form__field">
            <span>Password</span>
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>

          <div className="login-form__actions">
            <Button type="submit" variant="evidence">
              Enter Archive
            </Button>
            <Link className="shell-link" to="/">
              Back To Start
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
