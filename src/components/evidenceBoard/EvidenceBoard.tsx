import { useState, type DragEvent, type KeyboardEvent } from "react";

import { Button } from "../button/Button";
import { EvidenceBoardHeader } from "./EvidenceBoardHeader";
import { EvidenceBoardInspector } from "./EvidenceBoardInspector";
import { EvidenceBoardSlot } from "./EvidenceBoardSlot";
import { EvidenceBoardTray } from "./EvidenceBoardTray";
import { getBoardItemById, useGameStore } from "../../game/store";
import "./evidence-board.scss";

export interface EvidenceBoardProps {
  className?: string;
}

export function EvidenceBoard({ className = "" }: EvidenceBoardProps) {
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [dropTargetSlotId, setDropTargetSlotId] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState(
    "Board ready. Select a tray item, then place it into a theory slot.",
  );
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

  const announceSelection = (itemId: string) => {
    const item = getBoardItemById(itemId);
    if (item) {
      setLiveMessage(`${item.label} selected. Move to a theory slot and press Enter or Space to place it.`);
    }
  };

  const handleSelectItem = (itemId: string) => {
    selectItem(itemId);
    announceSelection(itemId);
  };

  const handleTrayItemDragStart = (event: DragEvent<HTMLButtonElement>, itemId: string) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", itemId);
    handleSelectItem(itemId);
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
      const item = getBoardItemById(itemId);
      const slot = board.slots.find((entry) => entry.id === slotId);
      if (item && slot) {
        setLiveMessage(`${item.label} placed in ${slot.label}.`);
      }
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

  const handleSlotKeyAssign = (event: KeyboardEvent<HTMLDivElement>, slotId: string) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    if (!selectedItemId) {
      setLiveMessage("No item selected. Choose a tray item first.");
      return;
    }

    assignSelectedItem(slotId);
    const item = getBoardItemById(selectedItemId);
    const slot = board.slots.find((entry) => entry.id === slotId);
    if (item && slot) {
      setLiveMessage(`${item.label} placed in ${slot.label}.`);
    }
  };

  const handleClearSlot = (slotId: string) => {
    clearSlot(slotId);
    const slot = board.slots.find((entry) => entry.id === slotId);
    if (slot) {
      setLiveMessage(`${slot.label} cleared.`);
    }
  };

  const handleResetTheory = () => {
    resetTheory();
    setLiveMessage("Board reset. Select a tray item to start building the theory again.");
  };

  const handleSubmitTheory = () => {
    const isCorrect = board.slots.every(
      (slot) => assignments[slot.id] === board.solution[slot.id],
    );
    submitTheory();
    setLiveMessage(
      isCorrect
        ? "Theory submitted. The arrangement is correct."
        : "Theory submitted. The arrangement is not correct yet.",
    );
  };

  return (
    <section className={["evidence-board", className].filter(Boolean).join(" ")}>
      <p className="evidence-board__sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>
      <EvidenceBoardHeader title={board.title} objective={board.objective} />

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
                <EvidenceBoardSlot
                  key={slot.id}
                  slot={slot}
                  assignedItem={assignedItem}
                  isDroppable={Boolean(draggingItemId)}
                  isDropTarget={dropTargetSlotId === slot.id}
                  selectedItemLabel={selectedItem?.label}
                  onDragOver={handleSlotDragOver}
                  onDrop={handleSlotDrop}
                  onDragLeave={handleSlotDragLeave}
                  onAssign={assignSelectedItem}
                  onClear={handleClearSlot}
                  onKeyAssign={handleSlotKeyAssign}
                />
              );
            })}
          </div>

          <div className="evidence-board__actions">
            <Button
              variant="evidence"
              onClick={handleSubmitTheory}
              disabled={!allSlotsFilled}
            >
              Submit Theory
            </Button>
            <Button variant="archive" onClick={handleResetTheory}>
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
                : "Drag items from the tray into the theory slots, or use the keyboard: select a tray item, then focus a slot and press Enter or Space."}
          </div>
        </div>

        <EvidenceBoardInspector selectedItem={selectedItem} />
      </div>

      <EvidenceBoardTray
        items={board.items}
        selectedItemId={selectedItemId}
        draggingItemId={draggingItemId}
        onSelectItem={handleSelectItem}
        onDragStart={handleTrayItemDragStart}
        onDragEnd={handleTrayItemDragEnd}
      />
    </section>
  );
}
