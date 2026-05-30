import "./case-page.scss";

import { Button, EvidenceBoard, EvidenceCard, Folder, SuspectCard } from "../components";
import { useGameStore } from "../game/store";

export function CasePage() {
  const currentCase = useGameStore((state) => state.currentCase);

  return (
    <section className="case-page">
      <section className="app-shell__masthead">
        <p className="app-shell__eyebrow">{currentCase.subtitle}</p>
        <div className="app-shell__topline">
          <div>
            <h2 className="app-shell__title">{currentCase.title}</h2>
            <p className="app-shell__lede">{currentCase.description}</p>
          </div>
          <div className="app-shell__actions">
            <Button variant="evidence">Examine Evidence</Button>
            <Button variant="archive">View Archive</Button>
          </div>
        </div>
      </section>

      <section className="app-shell__layout">
        <div className="app-shell__sidebar">
          <Folder
            title={currentCase.caseFile.title}
            tabLabel={currentCase.caseFile.tabLabel}
            info={
              <>
                {currentCase.caseFile.info.map((entry) => (
                  <div key={entry.label}>
                    <strong>{entry.label}:</strong> {entry.value}
                  </div>
                ))}
              </>
            }
            content={
              <>
                {currentCase.caseFile.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </>
            }
          />

          <EvidenceCard
            title={currentCase.sidebarEvidence.title}
            description={currentCase.sidebarEvidence.description}
            imageUrl={currentCase.sidebarEvidence.imageUrl}
          />

          <SuspectCard
            name={currentCase.sidebarSuspect.name}
            occupation={currentCase.sidebarSuspect.occupation}
            age={currentCase.sidebarSuspect.age}
            alibi={currentCase.sidebarSuspect.alibi}
            description={currentCase.sidebarSuspect.description}
            imageUrl={currentCase.sidebarSuspect.imageUrl}
          />
        </div>

        <div className="app-shell__board">
          <EvidenceBoard />
        </div>
      </section>
    </section>
  );
}
