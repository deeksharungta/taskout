import React from "react";
import classes from "./CompletedPage.module.css";
import { useSelector } from "react-redux";
import CompletedTaskItems from "../components/CompletedTaskItem/CompletedTaskItems";
import { Helmet } from "react-helmet";
import Card from "../components/UI/Card";

export default function CompletedPage() {
  const tasks = useSelector((state) => state.task.completedTasks);

  const distributedTasks = tasks.reduce((acc, task) => {
    const { collection } = task;
    if (!acc[collection]) {
      acc[collection] = [];
    }
    acc[collection].push(task);
    return acc;
  }, {});

  return (
    <Card>
      <Helmet>
        <title>Completed | Taskout</title>
      </Helmet>
      <h1 className={classes.title}>Completed</h1>
      {Object.keys(distributedTasks).length > 0 ? (
        <CompletedTaskItems distributedTasks={distributedTasks} />
      ) : (
        <p className={classes["fallback-text"]}>
          // Your accomplishments await; complete tasks to unveil them here.
        </p>
      )}
    </Card>
  );
}
