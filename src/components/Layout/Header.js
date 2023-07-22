import React from "react";
import Logo from "../../assets/Logo.svg";
import classes from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={classes.header}>
      <Link to="/">
        <img className={classes.logo} src={Logo} alt="Logo of Taskout" />
      </Link>
      <ul className={classes.authentication}>
        <li className={classes.login}>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Login
          </NavLink>
        </li>
        <li className={classes.signup}>
          <NavLink
            to="/auth/signup"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Signup
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
