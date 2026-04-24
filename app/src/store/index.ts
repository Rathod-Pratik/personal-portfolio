import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CreateAuthSlice } from "./Slice/Auth.Slice";
import { CreateProgressSlice } from "./Slice/Progress.slice";
import type { AuthSlice } from "@Type";
import type { ProgressSlice } from "./Slice/Progress.slice";

type AppStore = AuthSlice & ProgressSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...CreateAuthSlice(set),
      ...CreateProgressSlice(set),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
