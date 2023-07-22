import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "../../assets/edit2.svg";
import DeleteIcon from "../../assets/trash.svg";
import classes from "./TaskItem.module.css";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import DeleteDialogBox from "../DeleteDialogBox/DeleteDialogBox";
import { completeData, deleteData } from "../../store/task-actions";
import DateUI from "../UI/DateUI";

export default function TaskItem(props) {
  const dispatch = useDispatch();
  const [style, setStyle] = useState({ display: "none" });
  const [editMode, setEditMode] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const checkboxChangeHandler = () => {
    dispatch(completeData(props.task.id));
  };

  const editHandler = () => {
    setEditMode(true);
  };

  const deleteHandler = () => {
    dispatch(deleteData(props.task.id));
  };

  const deleteDialogBoxHandler = () => {
    setShowDialog(true);
  };

  const closeDeleteDialogBoxHandler = () => {
    setShowDialog(false);
  };

  const closeEditFormHandler = () => {
    setEditMode(false);
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
        <AddTaskForm
          onClose={closeEditFormHandler}
          initialValues={props.task}
        />
      )}
      <div
        key={props.task.id}
        className={classes["task-item__description"]}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        <input
          type="checkbox"
          id={props.task.id}
          name="checkbox"
          className={classes["task-item__checkbox"]}
          onChange={checkboxChangeHandler}
        />
        <label htmlFor={props.task.id} className={classes["task-item__text"]}>
          {props.task.name}
        </label>

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
      <div
        className={classes["task-details"]}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        {props.task.description && (
          <p className={classes.description}>{props.task.description}</p>
        )}
        {props.task.date && props.label !== "Today" && (
          <DateUI className={classes.date} date={new Date(props.task.date)} />
        )}
      </div>
    </>
  );
}
