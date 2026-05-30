import { Link, Outlet, useNavigate } from "react-router-dom";

import { Button } from "../../components";
import { useGameStore } from "../../game/store";

export function GameLayout() {
  const currentCase = useGameStore((state) => state.currentCase);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <main className="game-shell">
      <header className="game-shell__header">
        <div>
          <p className="game-shell__eyebrow">Case archive / local prototype</p>
          <h1 className="game-shell__title">{currentCase.title}</h1>
        </div>

        <div className="game-shell__controls">
          <nav className="game-shell__nav" aria-label="Game navigation">
            <Link className="shell-link" to={`/cases/${currentCase.id}`}>
              Active case
            </Link>
            <Link className="shell-link" to="/archive">
              Archive
            </Link>
            <Link className="shell-link" to="/profile">
              Profile
            </Link>
          </nav>

          <div className="game-shell__session">
            <span className="game-shell__user">Investigator Mode</span>
            <Button variant="archive" onClick={handleLogout}>
              Return To Start
            </Button>
          </div>
        </div>
      </header>

      <Outlet />
    </main>
  );
}
