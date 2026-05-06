import { create } from "zustand";

import { bellweatherCase, type BoardItem, type CaseData } from "./caseData";

export type TheoryResult = "idle" | "correct" | "incorrect";

interface GameState {
  currentCase: CaseData;
  selectedItemId: string;
  assignments: Record<string, string>;
  result: TheoryResult;
  selectItem: (itemId: string) => void;
  assignSelectedItem: (slotId: string) => void;
  clearSlot: (slotId: string) => void;
  submitTheory: () => void;
  resetTheory: () => void;
}

const initialCase = bellweatherCase;

const getBoardItems = (state: GameState) => state.currentCase.board.items;

export const useGameStore = create<GameState>((set, get) => ({
  currentCase: initialCase,
  selectedItemId: initialCase.board.items[0]?.id ?? "",
  assignments: {},
  result: "idle",
  selectItem: (itemId) => {
    set({ selectedItemId: itemId });
  },
  assignSelectedItem: (slotId) => {
    const { selectedItemId } = get();
    if (!selectedItemId) {
      return;
    }

    set((state) => ({
      assignments: {
        ...state.assignments,
        [slotId]: selectedItemId,
      },
      result: "idle",
    }));
  },
  clearSlot: (slotId) => {
    set((state) => {
      const nextAssignments = { ...state.assignments };
      delete nextAssignments[slotId];

      return {
        assignments: nextAssignments,
        result: "idle",
      };
    });
  },
  submitTheory: () => {
    const state = get();
    const isCorrect = state.currentCase.board.slots.every(
      (slot) => state.assignments[slot.id] === state.currentCase.board.solution[slot.id],
    );

    set({ result: isCorrect ? "correct" : "incorrect" });
  },
  resetTheory: () => {
    set({ assignments: {}, result: "idle" });
  },
}));

export const getBoardItemById = (itemId: string): BoardItem | null => {
  const state = useGameStore.getState();
  return getBoardItems(state).find((item) => item.id === itemId) ?? null;
};
