import React, { useState } from "react";
import TaskItems from "../components/TaskItems/TaskItems";
import AddTaskIcon from "../assets/AddTaskIcon.svg";
import classes from "./TodayPage.module.css";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import { Helmet } from "react-helmet";
import DateUI from "../components/UI/DateUI";
import useTasks from "../hooks/use-tasks";
import Card from "../components/UI/Card";

export default function TodayPage() {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks } = useTasks("=");

  const clickHandler = () => {
    setShowAddTask(true);
  };

  const closeHandler = () => {
    setShowAddTask(false);
  };

  return (
    <Card>
      <Helmet>
        <title>Today | Taskout</title>
      </Helmet>
      <div className={classes.heading}>
        <h1 className={classes.title}>Today</h1>
        <DateUI className={classes.date} date={new Date()} />
      </div>
      <button className={classes["add-task-btn"]} onClick={clickHandler}>
        <img src={AddTaskIcon} alt="Add Task Icon" />
        Add task
      </button>
      {showAddTask && <AddTaskForm onClose={closeHandler} />}
      {Object.keys(tasks).length > 0 ? (
        <TaskItems tasks={tasks} label="Today" />
      ) : (
        <p className={classes["fallback-text"]}>
          // Seize the day's potential; add your tasks to shape it.
        </p>
      )}
    </Card>
  );
}
