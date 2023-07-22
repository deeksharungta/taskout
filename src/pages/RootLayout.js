import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./RootLayout.module.css";
import SideBar from "../components/SideBar/SideBar";
import { auth } from "../utils/firebase";
import Media from "react-media";

const RootLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (!user) {
  //       navigate("/auth/login");
  //     }
  //   });
  // }, []);

  return (
    <>
      <Header />
      <main className={classes.layout}>
        <Media query="(min-width: 832px)" render={() => <SideBar />} />
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
