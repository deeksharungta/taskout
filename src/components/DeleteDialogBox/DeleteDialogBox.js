import React from "react";
import classes from "./DeleteDialogBox.module.css";
import Modal from "../UI/Modal";

const DeleteDialogBox = (props) => {
  return (
    <Modal onClose={props.cancelHandler}>
      <div className={classes["delete-dialog"]}>
        <h3>Are you sure you want to delete?</h3>
        <div className={classes.actions}>
          <button
            className={classes["btn-secondary"]}
            onClick={props.cancelHandler}
          >
            Cancel
          </button>
          <button
            className={classes["btn-primary"]}
            onClick={props.confirmHandler}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDialogBox;
