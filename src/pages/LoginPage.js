import React from "react";
import classes from "./LoginPage.module.css";
import Logo from "../assets/Logo.svg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AuthForm from "../components/Authentication/AuthForm";

const LoginPage = () => {
  return (
    <div className={classes["login-page"]}>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <Link to="/">
        <img src={Logo} alt="Logo of Taskout" />
      </Link>
      <div className={classes.form}>
        <AuthForm label="login" />
      </div>
    </div>
  );
};

export default LoginPage;
