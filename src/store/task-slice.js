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
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;
