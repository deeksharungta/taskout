import React, { useEffect } from "react";
import classes from "./CompletedPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import CompletedTaskItems from "../components/CompletedTaskItem/CompletedTaskItems";
import { Helmet } from "react-helmet";
import { auth } from "../utils/firebase";
import { fetchData } from "../store/task-actions";
import Card from "../components/UI/Card";

export default function CompletedPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.completedTasks);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        dispatch(fetchData());
      } else {
      }
    });
  }, []);

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
