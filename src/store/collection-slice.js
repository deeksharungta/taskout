import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [],
  },
  reducers: {
    replaceCollection(state, action) {
      state.collections = action.payload;
    },
  },
});

export const collectionActions = collectionSlice.actions;

export default collectionSlice;
