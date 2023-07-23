import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import SideBar from "../components/SideBar/SideBar";
import { auth } from "../utils/firebase";
import Media from "react-media";
import { useDispatch } from "react-redux";
import { fetchCollectionData } from "../store/collection-actions";
import { fetchData } from "../store/task-actions";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        dispatch(fetchCollectionData());
        dispatch(fetchData());
      } else {
      }
    });
  }, []);

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
