import { EvidenceCard } from "../evidenceCard/EvidenceCard";
import { SuspectCard } from "../suspectCard/SuspectCard";
import { type BoardItem } from "../../game/caseData";

export interface EvidenceBoardInspectorProps {
  selectedItem: BoardItem | null;
}

function renderBoardItem(item: BoardItem) {
  if (item.category === "suspect") {
    return (
      <SuspectCard
        name={item.name}
        occupation={item.occupation}
        age={item.age}
        description={item.description}
        alibi={item.alibi}
        imageUrl={item.imageUrl}
      />
    );
  }

  return (
    <EvidenceCard
      title={item.title}
      description={item.description}
      imageUrl={item.imageUrl}
    />
  );
}

export function EvidenceBoardInspector({ selectedItem }: EvidenceBoardInspectorProps) {
  return (
    <aside className="evidence-board__inspector">
      <div className="evidence-board__panel-header">
        <h3>Selected item</h3>
        <p>
          {selectedItem
            ? `${selectedItem.label} is active. Drag it into a theory slot or click a slot to place it.`
            : "No item selected yet."}
        </p>
      </div>

      {selectedItem ? (
        <>
          <div className="evidence-board__selected-meta">
            <span>{selectedItem.category}</span>
            <p>{selectedItem.note}</p>
          </div>
          <div className="evidence-board__selected-card">{renderBoardItem(selectedItem)}</div>
        </>
      ) : null}
    </aside>
  );
}
