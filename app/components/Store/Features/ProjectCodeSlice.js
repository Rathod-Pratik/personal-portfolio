// ProjectCodeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: null, // Store the project data here
};

const ProjectCodeSlice = createSlice({
  name: "projectCode",
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
  },
});

export const { setProjectData } = ProjectCodeSlice.actions;
export default ProjectCodeSlice.reducer;
