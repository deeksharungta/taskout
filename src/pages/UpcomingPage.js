import React, { useState } from "react";
import TaskItems from "../components/TaskItems/TaskItems";
import AddTaskIcon from "../assets/AddTaskIcon.svg";
import classes from "./UpcomingPage.module.css";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import { Helmet } from "react-helmet";
import useTasks from "../hooks/use-tasks";
import Card from "../components/UI/Card";

export default function UpcomingPage() {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks } = useTasks(">");

  const clickHandler = () => {
    setShowAddTask(true);
  };

  const closeHandler = () => {
    setShowAddTask(false);
  };

  return (
    <Card>
      <Helmet>
        <title>Upcoming | Taskout</title>
      </Helmet>
      <h1 className={classes.title}>Upcoming</h1>
      <button className={classes["add-task-btn"]} onClick={clickHandler}>
        <img src={AddTaskIcon} alt="Alt Task Icon" />
        Add task
      </button>
      {showAddTask && <AddTaskForm onClose={closeHandler} />}
      {Object.keys(tasks).length > 0 ? (
        <TaskItems tasks={tasks} label="Upcoming" />
      ) : (
        <p className={classes["fallback-text"]}>
          // The road ahead is clear; fill it with your upcoming tasks.
        </p>
      )}
    </Card>
  );
}
