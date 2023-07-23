import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    completedTasks: [],
  },
  reducers: {
    replaceTask(state, action) {
      state.tasks = action.payload.tasks;
      state.completedTasks = action.payload.completedTasks;
    },

    deleteTask(state, action) {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },

    deleteCollectionTask(state, action) {
      const collectionId = action.payload;
      state.tasks = state.tasks.filter(
        (task) => task.collectionId !== collectionId
      );
    },
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;
