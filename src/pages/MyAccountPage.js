import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile, updatePassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import BackArrow from "../assets/arrowcircleleft.svg";
import classes from "./MyAccountPage.module.css";
import Card from "../components/UI/Card";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          displayName: user.displayName,
          email: user.email,
          photoURL:
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${user.displayName}`,
        });
      } else {
        navigate("/");
      }
    });
  }, []);

  const [editMode, setEditMode] = useState({
    displayName: false,
    password: false,
  });

  const [formValues, setFormValues] = useState({
    displayName: userData.displayName,
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const editHandler = (field) => {
    setEditMode({
      ...editMode,
      [field]: true,
    });
  };

  const saveHandler = (field) => {
    if (field === "displayName") {
      updateProfile(user, {
        ...userData,
        displayName: formValues.displayName,
        photoURL: `https://ui-avatars.com/api/?name=${formValues.displayName}`,
      })
        .then(function () {
          setUserData({
            ...userData,
            displayName: formValues.displayName,
            photoURL: `https://ui-avatars.com/api/?name=${formValues.displayName}`,
          });
        })
        .catch(function (error) {});
    } else if (field === "password") {
      updatePassword(user, formValues.password)
        .then(function () {})
        .catch(function (error) {});
    }

    setEditMode({
      ...editMode,
      [field]: false,
    });
  };

  const cancelHandler = (field) => {
    setFormValues({
      ...formValues,
      [field]: userData[field],
    });

    setEditMode({
      ...editMode,
      [field]: false,
    });
  };

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Card>
      <Helmet>
        <title>My Account | Taskout</title>
      </Helmet>
      <div className={classes.heading}>
        <button className={classes["btn-back"]} onClick={goBack}>
          <img src={BackArrow} alt="Go Back Icon" />
        </button>
        <h1 className={classes.title}>My Account</h1>
      </div>
      <div>
        <div className={classes["profile-pic"]}>
          <img
            src={userData.photoURL}
            alt="Profile"
            className={classes.profile}
          />
          <div className={classes.field}>
            {editMode.displayName ? (
              <div className={classes["edit-field"]}>
                <input
                  type="text"
                  name="displayName"
                  value={formValues.displayName}
                  onChange={changeHandler}
                />
                <button
                  className={classes["btn-primary"]}
                  onClick={() => saveHandler("displayName")}
                >
                  Save
                </button>
                <button
                  className={classes.btn}
                  onClick={() => cancelHandler("displayName")}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className={classes["username-text"]}>
                <p>{userData.displayName}</p>
                <button
                  onClick={() => editHandler("displayName")}
                  className={classes.btn}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.field}>
          <label>Email</label>
          <div className={classes.text}>
            <p>{userData.email}</p>
          </div>
        </div>
        <div className={classes.field}>
          <label>Password</label>
          {editMode.password ? (
            <div className={classes["edit-field"]}>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={changeHandler}
              />
              <button
                className={classes["btn-primary"]}
                onClick={() => saveHandler("password")}
              >
                Save
              </button>
              <button
                className={classes.btn}
                onClick={() => cancelHandler("password")}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className={classes.text}>
              <p>********</p>
              <button
                className={classes.btn}
                onClick={() => editHandler("password")}
              >
                Change
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={classes["sign-out"]}>
        <button className={classes["btn-signout"]} onClick={signOutHandler}>
          Sign Out
        </button>
      </div>
    </Card>
  );
};

export default MyAccountPage;
