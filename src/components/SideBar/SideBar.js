import React, { useState } from "react";
import classes from "./SideBar.module.css";
import overdueIcon from "../../assets/warning2.svg";
import todayIcon from "../../assets/calendar.svg";
import upcomingIcon from "../../assets/calendarsearch.svg";
import completedIcon from "../../assets/ticksquare.svg";
import addIcon from "../../assets/add.svg";
import CollectionItem from "../Collection/CollectionItem";
import { NavLink } from "react-router-dom";
import CollectionForm from "../Collection/CollectionForm";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [showAddCollection, setShowAddCollection] = useState(false);
  const clickHandler = () => {
    setShowAddCollection(true);
  };

  const closeHandler = () => {
    setShowAddCollection(false);
  };

  const collections = useSelector((state) => state.collection.collections);

  return (
    <aside className={classes.sidebar}>
      {showAddCollection && <CollectionForm onClose={closeHandler} />}
      <nav className={classes.buttons}>
        <NavLink
          to="/app/overdue"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <img src={overdueIcon} alt="Overdue Icon" />
          Overdue
        </NavLink>
        <NavLink
          to="/app/today"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <img src={todayIcon} alt="Today Icon" />
          Today
        </NavLink>
        <NavLink
          to="/app/upcoming"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <img src={upcomingIcon} alt="Upcoming Icon" />
          Upcoming
        </NavLink>
        <NavLink
          to="/app/completed"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <img src={completedIcon} alt="Completed Icon" />
          Completed
        </NavLink>
      </nav>
      <div className={classes["collection-heading"]}>
        <h1>Collections</h1>
        <button onClick={clickHandler}>
          <img src={addIcon} alt="Add Collection Icon" />
        </button>
      </div>
      <div className={classes.collection}>
        <ul className={classes.collectionName}>
          {collections.map((collection) => (
            <li key={collection.id}>
              <CollectionItem
                color={collection.color}
                name={collection.name}
                id={collection.id}
              />
              <hr className={classes.hr} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
