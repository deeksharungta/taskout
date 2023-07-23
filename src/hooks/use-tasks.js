import { useSelector } from "react-redux";

const useTasks = (filterTasksLogic) => {
  const tasks = useSelector((state) => state.task.tasks);

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
