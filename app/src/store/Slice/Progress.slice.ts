type ProgressSlice = {
    progress: number;
    setProgress: (progress: number) => void;
};

type SetState = (partial: Partial<ProgressSlice>) => void;

export const CreateProgressSlice = (set: SetState): ProgressSlice => ({
    progress: 0,
    setProgress: (progress) => set({ progress }),
});

export type { ProgressSlice };