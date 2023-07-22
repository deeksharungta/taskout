import React, { useState } from "react";
import classes from "./CollectionItem.module.css";
import { useDispatch } from "react-redux";
import EditIcon from "../../assets/edit2.svg";
import DeleteIcon from "../../assets/trash.svg";
import CollectionForm from "./CollectionForm";
import { NavLink } from "react-router-dom";
import DeleteDialogBox from "../DeleteDialogBox/DeleteDialogBox";
import { deleteCollectionData } from "../../store/collection-actions";

const CollectionItem = (props) => {
  const dispatch = useDispatch();
  const [style, setStyle] = useState({ display: "none" });
  const [editMode, setEditMode] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const colorStyle = {
    backgroundColor: props.color,
    width: "1.4rem",
    height: "1.4rem",
    borderRadius: "50%",
  };

  const editHandler = () => {
    setEditMode(true);
  };

  const closeEditFormHandler = () => {
    setEditMode(false);
  };

  const deleteHandler = () => {
    dispatch(deleteCollectionData(props.id));
  };

  const deleteDialogBoxHandler = () => {
    setShowDialog(true);
  };

  const closeDeleteDialogBoxHandler = () => {
    setShowDialog(false);
  };

  return (
    <>
      {showDialog && (
        <DeleteDialogBox
          cancelHandler={closeDeleteDialogBoxHandler}
          confirmHandler={deleteHandler}
        />
      )}
      {editMode && (
        <CollectionForm onClose={closeEditFormHandler} initialValues={props} />
      )}
      <div
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
        className={classes["collection-item"]}
      >
        <div style={colorStyle}></div>
        <NavLink
          to={`/app/project/${props.name}`}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          {props.name}
        </NavLink>
        <div className={classes.actions}>
          <button style={style} className={classes.btn} onClick={editHandler}>
            <img src={EditIcon} alt="Edit Icon" />
          </button>
          <button
            style={style}
            className={classes.btn}
            onClick={deleteDialogBoxHandler}
          >
            <img src={DeleteIcon} alt="Delete Icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
