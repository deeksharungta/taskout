import React from "react";
import TaskItems from "../components/TaskItems/TaskItems";
import classes from "./OverduePage.module.css";
import { Helmet } from "react-helmet";
import useTasks from "../hooks/use-tasks";
import Card from "../components/UI/Card";

export default function OverduePage() {
  const { tasks } = useTasks("<");

  return (
    <Card>
      <Helmet>
        <title>Overdue | Taskout</title>
      </Helmet>
      <h1 className={classes.title}>Overdue</h1>
      {Object.keys(tasks).length > 0 ? (
        <TaskItems tasks={tasks} label="Overdue" />
      ) : (
        <p className={classes["fallback-text"]}>
          // Time bows to your diligence; no overdue tasks in sight.
        </p>
      )}
    </Card>
  );
}
