import { ref, onValue, set, push } from "firebase/database";
import { db, auth } from "../utils/firebase";
import { taskActions } from "./task-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return (dispatch) => {
    const userRef = ref(db, `users/${auth?.currentUser?.uid}`);

    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();

      if (userData) {
        const tasks = userData.tasks ? Object.values(userData.tasks) : [];
        const completedTasks = userData.completedTasks
          ? Object.values(userData.completedTasks)
          : [];

        dispatch(taskActions.replaceTask({ tasks, completedTasks }));
      }
    });
  };
};

export const setData = (newTask) => {
  return async (dispatch) => {
    try {
      const tasksRef = ref(db, `users/${auth.currentUser.uid}/tasks`);
      const taskRef = push(tasksRef);

      await set(taskRef, {
        id: newTask.id,
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        collection: newTask.collection,
        color: newTask.color,
      });
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error adding task to the database!",
        })
      );
      // console.error("Error adding task to database:", error);
    }
  };
};

export const deleteData = (taskId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const tasks = state.task.tasks;

      const tasksRef = ref(db, `users/${auth.currentUser.uid}/tasks`);

      await set(
        tasksRef,
        tasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error deleting task from the database!",
        })
      );
      // console.error("Error deleting task from the database:", error);
    }
  };
};

export const completeData = (taskId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const tasks = state.task.tasks;
      const completedTask = tasks.find((task) => task.id === taskId);
      if (completedTask) {
        const completedTasksRef = ref(
          db,
          `users/${auth.currentUser.uid}/completedTasks`
        );

        await push(completedTasksRef, completedTask);

        const tasksRef = ref(db, `users/${auth.currentUser.uid}/tasks`);

        await set(
          tasksRef,
          tasks.filter((task) => task.id !== taskId)
        );

        //  dispatch(taskActions.completeTask(taskId));
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error completing task in the database!",
        })
      );
      // console.error("Error completing task in the database:", error);
    }
  };
};

export const editData = (editedTask) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const tasks = state.task.tasks;

      const existingTaskIndex = tasks.findIndex(
        (task) => task.id === editedTask.id
      );

      if (existingTaskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[existingTaskIndex] = {
          ...updatedTasks[existingTaskIndex],
          name: editedTask.name,
          description: editedTask.description,
          date: editedTask.date,
          collection: editedTask.collection,
          color: editedTask.color,
        };

        const tasksRef = ref(db, `users/${auth.currentUser.uid}/tasks`);

        await set(tasksRef, updatedTasks);

        // // Dispatch action to update Redux state with the edited task
        // dispatch(taskActions.editTask(editedTask));
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
