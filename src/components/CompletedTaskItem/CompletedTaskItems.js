import React from "react";
import classes from "./CompletedTaskItems.module.css";
import checkedImage from "../../assets/completed.svg";
import DateUI from "../UI/DateUI";
import { Link } from "react-router-dom";

const CompletedTaskItems = (props) => {
  return (
    <>
      {Object.entries(props.distributedTasks).map(([heading, tasks]) => (
        <div key={heading} className={classes["task-item"]}>
          <p className={classes.heading} style={{ background: tasks[0].color }}>
            {heading}
          </p>
          <ul className={classes.tasks}>
            {tasks.map((task) => (
              <li key={task.id}>
                <img src={checkedImage} alt="Checked Box" />
                <div className={classes["task-item__description"]}>
                  <p className={classes["task-item__text"]}>{task.name}</p>
                  {task.description && (
                    <p className={classes.description}>{task.description}</p>
                  )}
                  <DateUI className={classes.date} date={new Date(task.date)} />
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <Link to={`../project/${heading}`}>Go to Collection</Link>
        </div>
      ))}
    </>
  );
};

export default CompletedTaskItems;
