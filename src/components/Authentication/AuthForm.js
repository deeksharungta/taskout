import React, { useEffect } from "react";
import classes from "./AuthForm.module.css";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setCollectionData } from "../../store/collection-actions";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import { uiActions } from "../../store/ui-slice";

const AuthForm = ({ label }) => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const {
    value: emailValue,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

  const {
    value: usernameValue,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordValue,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.length > 5);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/app/today");
      }
    });
  }, []);

  const googleLoginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          setCollectionData({
            id: uuidv4(),
            name: "Personal",
            color: "#FF355E",
          })
        );
      })
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      });
  };

  const logInHandler = () => {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(() => {
        navigate("/app/today");
      })
      .catch((err) =>
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: err.message,
          })
        )
      );
  };

  const forgotPasswordHandler = () => {
    sendPasswordResetEmail(auth, emailValue)
      .then(() => {})
      .catch((error) =>
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        )
      );
  };

  const signUpHandler = () => {
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: usernameValue,
          photoURL: `https://ui-avatars.com/api/?name=${usernameValue}`,
        });
      })
      .then(() => {
        dispatch(
          setCollectionData({
            id: uuidv4(),
            name: "Personal",
            color: "#FF355E",
          })
        );
      })
      .then(() => {
        navigate("/app/today");
      })
      .catch((err) =>
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: err.message,
          })
        )
      );
  };

  return (
    <div className={classes["auth-form"]}>
      {label === "signup" && <h2 className={classes.heading}>Sign up</h2>}
      {label === "login" && <h2 className={classes.heading}>Log in</h2>}

      <div className={classes.button}>
        <button onClick={googleLoginHandler} className={classes.btn}>
          <FaGoogle className={classes.icon} />
          <span>Continue with Google</span>
        </button>
      </div>
      <hr />
      <div className={classes.form}>
        <div className={classes["form-control"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Enter your email"
          />
          {emailHasError && (
            <p className={classes["error-text"]}>
              Please include an "@" in the email address
            </p>
          )}
        </div>
        {label === "signup" && (
          <div className={classes["form-control"]}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={usernameChangeHandler}
              value={usernameValue}
              onBlur={usernameBlurHandler}
              placeholder="Enter your username"
            />
            {usernameHasError && (
              <p className={classes["error-text"]}>Username can't be empty</p>
            )}
          </div>
        )}
        <div className={classes["form-control"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            value={passwordValue}
            onBlur={passwordBlurHandler}
            placeholder="Enter your password"
          />
          {passwordHasError && (
            <p className={classes["error-text"]}>
              Password must be at least 6 character long
            </p>
          )}
        </div>
        <div className={classes.action}>
          {label === "signup" && (
            <button onClick={signUpHandler}>Sign up</button>
          )}
          {label === "login" && <button onClick={logInHandler}>Log In</button>}
        </div>
      </div>
      {label === "login" && (
        <button
          onClick={forgotPasswordHandler}
          className={classes["forgot-password-btn"]}
        >
          Forgot your password?
        </button>
      )}
      {label === "login" && (
        <p className={classes.text}>
          Don't have an account?{" "}
          <Link to="/auth/signup" className={classes.link}>
            Sign up
          </Link>
        </p>
      )}
      {label === "signup" && (
        <p className={classes.text}>
          Already signed up?{" "}
          <Link to="/auth/login" className={classes.link}>
            Go to Login
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
