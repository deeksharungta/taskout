import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import DesktopImage from "../assets/DesktopView.svg";
import MobileView from "../assets/MobileView.svg";
import classes from "./LandingPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import Media from "react-media";
import { Helmet } from "react-helmet";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/app/today");
      }
    });
  }, []);

  return (
    <div className={classes["landing-page"]}>
      <Helmet>
        <title>Taskout</title>
      </Helmet>
      <Header />
      <section className={classes["description-section"]}>
        <div className={classes.description}>
          <h1 className={classes.title}>
            Taskout: Organize, Prioritize, Achieve
          </h1>
          <p className={classes["sub-title"]}>
            Effortlessly manage your tasks. Set priorities, track progress, and
            achieve your goals seamlessly.
          </p>
          <NavLink
            to="/auth/signup"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Get Started
          </NavLink>
        </div>
        <div className={classes["website-image"]}>
          <Media
            query="(min-width: 632px)"
            render={() => (
              <img
                className={classes["desktop-img"]}
                src={DesktopImage}
                alt="Screenshot of the website"
              />
            )}
          />
          <Media
            query="(max-width: 631px)"
            render={() => (
              <img
                className={classes["mobile-img"]}
                src={MobileView}
                alt="Screenshot of the website"
              />
            )}
          />
        </div>
      </section>
    </div>
  );
}
