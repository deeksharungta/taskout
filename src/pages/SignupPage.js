import React from "react";
import AuthForm from "../components/Authentication/AuthForm";
import classes from "./SignupPage.module.css";
import { Helmet } from "react-helmet";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className={classes["signup-page"]}>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <Link to="/">
        <img src={Logo} alt="Logo of Taskout" />
      </Link>
      <div className={classes.form}>
        <AuthForm label="signup" />
      </div>
    </div>
  );
};

export default SignupPage;
