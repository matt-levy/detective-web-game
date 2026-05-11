export interface EvidenceBoardHeaderProps {
  title: string;
  objective: string;
}

export function EvidenceBoardHeader({ title, objective }: EvidenceBoardHeaderProps) {
  return (
    <header className="evidence-board__header">
      <div>
        <p className="evidence-board__eyebrow">Evidence board</p>
        <h2 className="evidence-board__title">{title}</h2>
      </div>
      <div className="evidence-board__objective">
        <span className="evidence-board__objective-label">Objective</span>
        <p>{objective}</p>
      </div>
    </header>
  );
}
