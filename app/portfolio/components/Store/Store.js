import { configureStore } from '@reduxjs/toolkit';
import projectCodeReducer from './Features/ProjectCodeSlice';

const store = configureStore({
  reducer: {
    projectCode: projectCodeReducer,
  },
});

export default store;
