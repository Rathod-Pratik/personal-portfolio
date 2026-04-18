export const CreateNoteSlice = (set) => ({
  Note: [],
  setNote: (Note) => set({ Note }),

  addNote: (newNote) =>
    set((state) => {
      if (state.Note.some((item) => item._id === newNote._id)) return state;
      return { Note: [...state.Note, newNote] };
    }),

  updateNote: (_id, updateNote) =>
    set((state) => ({
      Note: state.Note.map((item) => (item._id === _id ? updateNote : item)),
    })),

  removeNote: (_id) =>
    set((state) => ({
      Note: state.Note.filter((item) => item._id !== _id),
    })),
});
