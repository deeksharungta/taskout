import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import classes from "./TaskItems.module.css";
import { Link } from "react-router-dom";

export default function TaskItems(props) {
  return (
    <>
      {Object.entries(props.tasks).map(([heading, tasks]) => (
        <div key={heading} className={classes["task-item"]}>
          <p className={classes.heading} style={{ background: tasks[0].color }}>
            {heading}
          </p>
          <ul className={classes.tasks}>
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskItem task={task} label={props.label} />
              </li>
            ))}
          </ul>
          <hr />
          <Link to={`../project/${heading}`}>Go to Collection</Link>
        </div>
      ))}
    </>
  );
}
