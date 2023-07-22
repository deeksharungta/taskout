import { configureStore } from "@reduxjs/toolkit";
import collectionSlice from "./collection-slice";
import taskSlice from "./task-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    collection: collectionSlice.reducer,
    task: taskSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
