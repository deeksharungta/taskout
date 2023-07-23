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

    deleteCollection(state, action) {
      const collectionId = action.payload;
      state.collections = state.collections.filter(
        (collection) => collection.id !== collectionId
      );
    },
  },
});

export const collectionActions = collectionSlice.actions;

export default collectionSlice;
