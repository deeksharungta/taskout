import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./ProjectsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../components/TaskItem/TaskItem";
import { Helmet } from "react-helmet";
import Card from "../components/UI/Card";
import { auth } from "../utils/firebase";
import { fetchData } from "../store/task-actions";

const ProjectsPage = () => {
  const params = useParams();
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
  const filteredTasks = tasks.filter(
    (task) => task.collection === params.projectId
  );

  return (
    <Card>
      <Helmet>
        <title>{`${params.projectId} | Taskout`}</title>
      </Helmet>
      <h1 className={classes.title}>{params.projectId}</h1>
      {filteredTasks.length > 0 ? (
        <ul className={classes.tasks}>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} label={params.projectId} />
              <hr className={classes.hr} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={classes["fallback-text"]}>
          // An empty canvas awaits; no tasks found in this collection.
        </p>
      )}
    </Card>
  );
};

export default ProjectsPage;
