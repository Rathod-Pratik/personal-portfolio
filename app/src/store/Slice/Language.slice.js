export const CreateLanguageSlice = (set) => ({
  language: [],
  setLanguage: (language) => set({ language }),

  addLanguage: (newLang) =>
    set((state) => {
      if (state.language.some((item) => item._id === newLang._id)) return state;
      return { language: [...state.language, newLang] };
    }),

  updateLanguage: (_id, updatedLang) =>
    set((state) => ({
      language: state.language.map((item) =>
        item._id === _id ? updatedLang : item
      ),
    })),

  removeLanguage: (_id) =>
    set((state) => ({
      language: state.language.filter((item) => item._id !== _id),
    })),
});
