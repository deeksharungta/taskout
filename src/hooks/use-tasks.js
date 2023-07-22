import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { fetchData } from "../store/task-actions";

const useTasks = (filterTasksLogic) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        dispatch(fetchData());
      } else {
      }
    });
  }, []);

  const today = new Date();

  const filteredTasks = tasks?.filter((task) => {
    const taskDate = new Date(task.date);

    if (filterTasksLogic === "=") {
      return (
        taskDate.toISOString().substr(0, 10) ===
        today.toISOString().substr(0, 10)
      );
    } else if (filterTasksLogic === ">") {
      return (
        taskDate.toISOString().substr(0, 10) > today.toISOString().substr(0, 10)
      );
    } else if (filterTasksLogic === "<") {
      return (
        taskDate.toISOString().substr(0, 10) < today.toISOString().substr(0, 10)
      );
    }
  });

  const distributedTasks = filteredTasks.reduce((acc, task) => {
    const { collection } = task;
    if (!acc[collection]) {
      acc[collection] = [];
    }
    acc[collection].push(task);
    return acc;
  }, {});

  return {
    tasks: distributedTasks,
  };
};

export default useTasks;
