import { create } from "zustand";

export type GettingStartedState =
  | "wifi"
  | "user"
  | "env"
  | "complete"
  | "divider";

interface StateGettingStarted {
  step: GettingStartedState;
  changeState: (step: GettingStartedState) => void;
}

export const useGettingStartedStep = create<StateGettingStarted>()((set) => ({
  step: "wifi",
  changeState: (newState) => set(() => ({ step: newState })),
}));
