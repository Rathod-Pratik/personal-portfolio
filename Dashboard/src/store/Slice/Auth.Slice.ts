import type { AuthSlice } from "@Type";

type SetState = (partial: Partial<AuthSlice>) => void;

export const CreateAuthSlice = (set: SetState): AuthSlice => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
});