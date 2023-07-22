import React, { useState } from "react";
import AddTaskIcon from "../../assets/AddTaskIcon.svg";
import Logo from "../../assets/Logo.svg";
import HamburgerMenu from "../../assets/hambergermenu.svg";
import CloseMenu from "../../assets/cross.svg";
import classes from "./Header.module.css";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../utils/firebase";
import Modal from "../UI/Modal";
import SideBar from "../SideBar/SideBar";
import Media from "react-media";

export default function Header() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const clickHandler = () => {
    setShowAddTask(true);
  };

  const closeHandler = () => {
    setShowAddTask(false);
  };

  const toggleHamburgerMenu = () => {
    setShowHamburgerMenu((prevShow) => !prevShow);
  };

  return (
    <>
      <header className={classes.header}>
        <div>
          <Media
            query="(max-width: 831px)"
            render={() => (
              <button className={classes.btn} onClick={toggleHamburgerMenu}>
                <img
                  src={showHamburgerMenu ? CloseMenu : HamburgerMenu}
                  alt="Icon for closing and opening hamburger menu"
                />
              </button>
            )}
          />
          <Media
            query="(min-width: 832px)"
            render={() => (
              <Link to="/app/today">
                <img
                  src={Logo}
                  className={classes.logo}
                  alt="Logo of Taskout"
                />
              </Link>
            )}
          />
        </div>
        <div className={classes.right}>
          <button onClick={clickHandler} className={classes.btn}>
            <img src={AddTaskIcon} alt="Add Task Icon" />
          </button>
          {showAddTask && <AddTaskForm onClose={closeHandler} />}
          <NavLink
            to="/app/account"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <img
              src={auth?.currentUser?.photoURL}
              className={classes.profile}
              alt="Profile"
            />
          </NavLink>
        </div>
      </header>
      {showHamburgerMenu && (
        <Modal onClose={toggleHamburgerMenu} className={classes.modal}>
          <SideBar />
        </Modal>
      )}
    </>
  );
}
