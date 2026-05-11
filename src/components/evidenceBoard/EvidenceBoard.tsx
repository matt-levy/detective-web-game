import { useState, type DragEvent } from "react";

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
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [dropTargetSlotId, setDropTargetSlotId] = useState<string | null>(null);
  const board = useGameStore((state) => state.currentCase.board);
  const selectedItemId = useGameStore((state) => state.selectedItemId);
  const assignments = useGameStore((state) => state.assignments);
  const result = useGameStore((state) => state.result);
  const selectItem = useGameStore((state) => state.selectItem);
  const assignSelectedItem = useGameStore((state) => state.assignSelectedItem);
  const assignItemToSlot = useGameStore((state) => state.assignItemToSlot);
  const clearSlot = useGameStore((state) => state.clearSlot);
  const submitTheory = useGameStore((state) => state.submitTheory);
  const resetTheory = useGameStore((state) => state.resetTheory);

  const selectedItem = selectedItemId ? getBoardItemById(selectedItemId) : null;
  const allSlotsFilled = board.slots.every((slot) => assignments[slot.id]);

  const handleTrayItemDragStart = (event: DragEvent<HTMLButtonElement>, itemId: string) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", itemId);
    selectItem(itemId);
    setDraggingItemId(itemId);
  };

  const handleTrayItemDragEnd = () => {
    setDraggingItemId(null);
    setDropTargetSlotId(null);
  };

  const handleSlotDragOver = (event: DragEvent<HTMLDivElement>, slotId: string) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (dropTargetSlotId !== slotId) {
      setDropTargetSlotId(slotId);
    }
  };

  const handleSlotDrop = (event: DragEvent<HTMLDivElement>, slotId: string) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("text/plain");
    if (itemId) {
      assignItemToSlot(itemId, slotId);
      selectItem(itemId);
    }
    setDraggingItemId(null);
    setDropTargetSlotId(null);
  };

  const handleSlotDragLeave = (event: DragEvent<HTMLDivElement>, slotId: string) => {
    const nextTarget = event.relatedTarget;
    if (
      dropTargetSlotId === slotId &&
      (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget))
    ) {
      setDropTargetSlotId(null);
    }
  };

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
                    draggingItemId ? "evidence-board__slot--droppable" : "",
                    dropTargetSlotId === slot.id ? "evidence-board__slot--over" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onDragOver={(event) => handleSlotDragOver(event, slot.id)}
                  onDrop={(event) => handleSlotDrop(event, slot.id)}
                  onDragLeave={(event) => handleSlotDragLeave(event, slot.id)}
                  onClick={() => assignSelectedItem(slot.id)}
                >
                  <span className="evidence-board__slot-label">{slot.label}</span>
                  {assignedItem ? (
                    <>
                      <span className="evidence-board__slot-value">{assignedItem.label}</span>
                      <span className="evidence-board__slot-note">{assignedItem.note}</span>
                      <button
                        type="button"
                        className="evidence-board__slot-clear"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearSlot(slot.id);
                        }}
                      >
                        Clear
                      </button>
                    </>
                  ) : (
                    <span className="evidence-board__slot-hint">{slot.hint}</span>
                  )}
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
                : "Drag items from the tray into the theory slots, or click a slot to place the active selection."}
          </div>
        </div>

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
      </div>

      <div className="evidence-board__tray">
        <div className="evidence-board__panel-header">
          <h3>Pin tray</h3>
          <p>Drag the fragments that best answer the current question onto the board.</p>
        </div>

        <div className="evidence-board__items">
          {board.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={[
                "evidence-board__item",
                selectedItemId === item.id ? "evidence-board__item--active" : "",
                draggingItemId === item.id ? "evidence-board__item--dragging" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => selectItem(item.id)}
              draggable
              onDragStart={(event) => handleTrayItemDragStart(event, item.id)}
              onDragEnd={handleTrayItemDragEnd}
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
