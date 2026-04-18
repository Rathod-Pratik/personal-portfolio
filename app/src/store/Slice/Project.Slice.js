export const CreateProjectSlice = (set) => ({
    project: [],
    setproject: (project) => set({ project }),
  
    addproject: (newproject) =>
      set((state) => {
        if (state.project.some((item) => item._id === newproject._id)) return state;
        return { project: [...state.project, newproject] };
      }),
  
    updateproject: (_id, updateproject) =>
      set((state) => ({
        project: state.project.map((item) => (item._id === _id ? updateproject : item)),
      })),
  
    removeproject: (_id) =>
      set((state) => ({
        project: state.project.filter((item) => item._id !== _id),
      })),
  });
  