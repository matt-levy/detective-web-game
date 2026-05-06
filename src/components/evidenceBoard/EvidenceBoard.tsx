import { Button } from "../button/Button";
import { EvidenceCard } from "../evidenceCard/EvidenceCard";
import { SuspectCard } from "../suspectCard/SuspectCard";
import { type BoardItem } from "../../game/caseData";
import { getBoardItemById, useGameStore } from "../../game/store";
import "./evidence-board.scss";

export interface EvidenceBoardProps {
  className?: string;
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

export function EvidenceBoard({ className = "" }: EvidenceBoardProps) {
  const board = useGameStore((state) => state.currentCase.board);
  const selectedItemId = useGameStore((state) => state.selectedItemId);
  const assignments = useGameStore((state) => state.assignments);
  const result = useGameStore((state) => state.result);
  const selectItem = useGameStore((state) => state.selectItem);
  const assignSelectedItem = useGameStore((state) => state.assignSelectedItem);
  const clearSlot = useGameStore((state) => state.clearSlot);
  const submitTheory = useGameStore((state) => state.submitTheory);
  const resetTheory = useGameStore((state) => state.resetTheory);

  const selectedItem = selectedItemId ? getBoardItemById(selectedItemId) : null;
  const allSlotsFilled = board.slots.every((slot) => assignments[slot.id]);

  return (
    <section className={["evidence-board", className].filter(Boolean).join(" ")}>
      <header className="evidence-board__header">
        <div>
          <p className="evidence-board__eyebrow">Evidence board</p>
          <h2 className="evidence-board__title">{board.title}</h2>
        </div>
        <div className="evidence-board__objective">
          <span className="evidence-board__objective-label">Objective</span>
          <p>{board.objective}</p>
        </div>
      </header>

      <div className="evidence-board__layout">
        <div className="evidence-board__theory">
          <div className="evidence-board__panel-header">
            <h3>Theory build</h3>
            <p>{board.prompt}</p>
          </div>

          <div className="evidence-board__slots">
            {board.slots.map((slot) => {
              const assignedItem = getBoardItemById(assignments[slot.id]);

              return (
                <div
                  key={slot.id}
                  className={[
                    "evidence-board__slot",
                    assignedItem ? "evidence-board__slot--filled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="evidence-board__slot-label">{slot.label}</span>
                  {assignedItem ? (
                    <>
                      <span className="evidence-board__slot-value">{assignedItem.label}</span>
                      <span className="evidence-board__slot-note">{assignedItem.note}</span>
                      <button
                        type="button"
                        className="evidence-board__slot-clear"
                        onClick={() => clearSlot(slot.id)}
                      >
                        Clear
                      </button>
                    </>
                  ) : (
                    <span className="evidence-board__slot-hint">{slot.hint}</span>
                  )}
                  <button
                    type="button"
                    className="evidence-board__slot-assign"
                    onClick={() => assignSelectedItem(slot.id)}
                  >
                    {assignedItem ? "Replace with selected item" : "Pin selected item here"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="evidence-board__actions">
            <Button
              variant="evidence"
              onClick={submitTheory}
              disabled={!allSlotsFilled}
            >
              Submit Theory
            </Button>
            <Button variant="archive" onClick={resetTheory}>
              Reset Board
            </Button>
          </div>

          <div
            className={[
              "evidence-board__result",
              result === "correct" ? "evidence-board__result--correct" : "",
              result === "incorrect" ? "evidence-board__result--incorrect" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {result === "correct"
              ? board.successMessage
              : result === "incorrect"
                ? "The pieces do not hold together yet. Re-check the alibi, the witness account, and the physical clue."
                : "Select an item below, then pin it into the theory slots above."}
          </div>
        </div>

        <aside className="evidence-board__inspector">
          <div className="evidence-board__panel-header">
            <h3>Selected item</h3>
            <p>
              {selectedItem
                ? `${selectedItem.label} is active. Click a theory slot to pin it.`
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
      </div>

      <div className="evidence-board__tray">
        <div className="evidence-board__panel-header">
          <h3>Pin tray</h3>
          <p>Choose the fragments that best answer the current question.</p>
        </div>

        <div className="evidence-board__items">
          {board.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={[
                "evidence-board__item",
                selectedItemId === item.id ? "evidence-board__item--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => selectItem(item.id)}
            >
              <span className="evidence-board__item-chip">{item.category}</span>
              <span className="evidence-board__item-label">{item.label}</span>
              <span className="evidence-board__item-note">{item.note}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
