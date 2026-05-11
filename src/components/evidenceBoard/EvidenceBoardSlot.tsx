import { type DragEvent, type KeyboardEvent, type ReactNode } from "react";

import { type BoardItem, type EvidenceBoardSlot as EvidenceBoardSlotData } from "../../game/caseData";

export interface EvidenceBoardSlotProps {
  slot: EvidenceBoardSlotData;
  assignedItem: BoardItem | null;
  isDroppable: boolean;
  isDropTarget: boolean;
  selectedItemLabel?: string;
  onDragOver: (event: DragEvent<HTMLDivElement>, slotId: string) => void;
  onDrop: (event: DragEvent<HTMLDivElement>, slotId: string) => void;
  onDragLeave: (event: DragEvent<HTMLDivElement>, slotId: string) => void;
  onAssign: (slotId: string) => void;
  onClear: (slotId: string) => void;
  onKeyAssign: (event: KeyboardEvent<HTMLDivElement>, slotId: string) => void;
}

export function EvidenceBoardSlot({
  slot,
  assignedItem,
  isDroppable,
  isDropTarget,
  selectedItemLabel,
  onDragOver,
  onDrop,
  onDragLeave,
  onAssign,
  onClear,
  onKeyAssign,
}: EvidenceBoardSlotProps) {
  let slotContent: ReactNode;

  if (assignedItem) {
    slotContent = (
      <>
        <span className="evidence-board__slot-value">{assignedItem.label}</span>
        <span className="evidence-board__slot-note">{assignedItem.note}</span>
        <button
          type="button"
          className="evidence-board__slot-clear"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.stopPropagation();
            }
          }}
          onClick={(event) => {
            event.stopPropagation();
            onClear(slot.id);
          }}
        >
          Clear
        </button>
      </>
    );
  } else {
    slotContent = <span className="evidence-board__slot-hint">{slot.hint}</span>;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={[
        "evidence-board__slot",
        assignedItem ? "evidence-board__slot--filled" : "",
        isDroppable ? "evidence-board__slot--droppable" : "",
        isDropTarget ? "evidence-board__slot--over" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onDragOver={(event) => onDragOver(event, slot.id)}
      onDrop={(event) => onDrop(event, slot.id)}
      onDragLeave={(event) => onDragLeave(event, slot.id)}
      onClick={() => onAssign(slot.id)}
      onKeyDown={(event) => onKeyAssign(event, slot.id)}
      aria-label={
        assignedItem
          ? `${slot.label}. Assigned item ${assignedItem.label}. Press Enter or Space to replace it with ${selectedItemLabel ?? "the selected item"}.`
          : `${slot.label}. ${slot.hint}. Press Enter or Space to place ${selectedItemLabel ?? "the selected item"}.`
      }
    >
      <span className="evidence-board__slot-label">{slot.label}</span>
      {slotContent}
    </div>
  );
}
