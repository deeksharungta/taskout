import { ref, onValue, set, push } from "firebase/database";
import { db, auth } from "../utils/firebase";
import { uiActions } from "./ui-slice";
import { collectionActions } from "./collection-slice";
import { taskActions } from "./task-slice";

export const fetchCollectionData = () => {
  return (dispatch) => {
    const collectionRef = ref(
      db,
      `users/${auth?.currentUser?.uid}/collections`
    );

    onValue(collectionRef, (snapshot) => {
      const collectionData = snapshot.val();

      if (collectionData) {
        const collections = collectionData ? Object.values(collectionData) : [];

        dispatch(collectionActions.replaceCollection(collections));
      }
    });
  };
};

export const setCollectionData = (newCollection) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const collections = state.collection.collections;

      const existingCollection = collections.find(
        (collection) => collection.name === newCollection.name
      );

      if (!existingCollection) {
        const collectionsRef = ref(
          db,
          `users/${auth.currentUser.uid}/collections`
        );
        const collectionRef = push(collectionsRef);

        await set(collectionRef, {
          id: newCollection.id,
          name: newCollection.name,
          color: newCollection.color,
        });

        // dispatch(collectionActions.addCollection(newCollection));
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Collection with the same name already exists!",
          })
        );
        // console.error(
        //   "Collection with the same name already exists:",
        //   existingCollection
        // );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error adding collection to the database!",
        })
      );
      // console.error("Error adding collection to the database:", error);
    }
  };
};

export const deleteCollectionData = (collectionId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const collections = state.collection.collections;
      const tasks = state.task.tasks;

      const collectionsRef = ref(
        db,
        `users/${auth.currentUser.uid}/collections`
      );
      const tasksRef = ref(db, `users/${auth.currentUser.uid}/tasks`);

      await set(
        collectionsRef,
        collections.filter((collection) => collection.id !== collectionId)
      );

      await set(
        tasksRef,
        tasks.filter((task) => task.collectionId !== collectionId)
      );

      dispatch(collectionActions.deleteCollection(collectionId));
      dispatch(taskActions.deleteCollectionTask(collectionId));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error deleting collection from the database!",
        })
      );
      // console.error("Error deleting collection from the database:", error);
    }
  };
};

export const editCollectionData = (editedCollection) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const collections = state.collection.collections;

      const existingCollection = collections.find(
        (collection) => collection.id === editedCollection.id
      );

      const existingCollectionName = collections.find(
        (collection) => collection.name === editedCollection.name
      );

      const hasDifferentColor =
        existingCollection.color !== editedCollection.color;

      if (!existingCollectionName || hasDifferentColor) {
        const existingCollectionIndex = collections.findIndex(
          (collection) => collection.id === editedCollection.id
        );

        if (existingCollectionIndex !== -1) {
          const updatedCollections = [...collections];
          updatedCollections[existingCollectionIndex] = {
            ...updatedCollections[existingCollectionIndex],
            name: editedCollection.name,
            color: editedCollection.color,
          };

          const collectionsRef = ref(
            db,
            `users/${auth.currentUser.uid}/collections`
          );

          await set(collectionsRef, updatedCollections);

          // // Dispatch action to update Redux state with the edited task
          // dispatch(taskActions.editTask(editedTask));
        }
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Collection with the same name already exists!",
          })
        );
        // console.error(
        //   "Collection with the same name already exists:",
        //   existingCollection
        // );
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error editing task in the database!",
        })
      );
      // console.error("Error editing task in the database:", error);
    }
  };
};
