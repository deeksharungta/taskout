import React from "react";
import classes from "./ErrorPage.module.css";
import ErrorImage from "./../assets/Error.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={classes["error-page"]}>
      <img src={ErrorImage} alt="404 illustration" />
      <h1 className={classes["title"]}>Page Not Found!</h1>
      <Link to="/app/today">Click Here</Link>
    </div>
  );
};

export default ErrorPage;
