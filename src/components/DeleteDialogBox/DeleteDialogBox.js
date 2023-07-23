import React from "react";
import classes from "./DeleteDialogBox.module.css";
import Modal from "../UI/Modal";

const DeleteDialogBox = ({ cancelHandler, confirmHandler }) => {
  console.log(confirmHandler);
  return (
    <Modal onClose={cancelHandler}>
      <div className={classes["delete-dialog"]}>
        <h3>Are you sure you want to delete?</h3>
        <div className={classes.actions}>
          <button
            className={classes["btn-secondary"]}
            onClick={() => {
              cancelHandler();
            }}
          >
            Cancel
          </button>
          <button
            className={classes["btn-primary"]}
            onClick={() => {
              confirmHandler();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDialogBox;
