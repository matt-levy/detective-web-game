import { type DragEvent } from "react";

import { type BoardItem } from "../../game/caseData";

export interface EvidenceBoardTrayProps {
  items: BoardItem[];
  selectedItemId: string;
  draggingItemId: string | null;
  onSelectItem: (itemId: string) => void;
  onDragStart: (event: DragEvent<HTMLButtonElement>, itemId: string) => void;
  onDragEnd: () => void;
}

export function EvidenceBoardTray({
  items,
  selectedItemId,
  draggingItemId,
  onSelectItem,
  onDragStart,
  onDragEnd,
}: EvidenceBoardTrayProps) {
  return (
    <div className="evidence-board__tray">
      <div className="evidence-board__panel-header">
        <h3>Pin tray</h3>
        <p>Drag the fragments that best answer the current question onto the board.</p>
      </div>

      <div className="evidence-board__items">
        {items.map((item) => (
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
            onClick={() => onSelectItem(item.id)}
            draggable
            onDragStart={(event) => onDragStart(event, item.id)}
            onDragEnd={onDragEnd}
            aria-pressed={selectedItemId === item.id}
            aria-label={`${item.label}. ${item.note}. Press Enter or Space to select it, then move to a theory slot to place it.`}
          >
            <span className="evidence-board__item-chip">{item.category}</span>
            <span className="evidence-board__item-label">{item.label}</span>
            <span className="evidence-board__item-note">{item.note}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
