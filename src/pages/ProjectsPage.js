import React from "react";
import { useParams } from "react-router-dom";
import classes from "./ProjectsPage.module.css";
import { useSelector } from "react-redux";
import TaskItem from "../components/TaskItem/TaskItem";
import { Helmet } from "react-helmet";
import ErrorPage from "./ErrorPage";
import Card from "../components/UI/Card";

const ProjectsPage = () => {
  const collections = useSelector((state) => state.collection.collections);

  const params = useParams();
  const tasks = useSelector((state) => state.task.tasks);

  const checkProjectId = (projectId) => {
    const matchingId = collections.find(
      (collection) => collection.name === projectId
    );
    return matchingId;
  };
  const showTasks = checkProjectId(params.projectId);
  const filteredTasks = tasks.filter(
    (task) => task.collection === params.projectId
  );

  return (
    <>
      {showTasks ? (
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
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p className={classes["fallback-text"]}>
              // An empty canvas awaits; no tasks found in this collection.
            </p>
          )}
        </Card>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default ProjectsPage;
