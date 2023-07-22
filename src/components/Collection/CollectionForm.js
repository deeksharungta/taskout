import React, { useEffect } from "react";
import classes from "./CollectionForm.module.css";
import Modal from "../UI/Modal";
import useInput from "../../hooks/use-input";
import { useDispatch } from "react-redux";
import { colors } from "../../utils/colors";
import { v4 as uuidv4 } from "uuid";
import {
  editCollectionData,
  setCollectionData,
} from "../../store/collection-actions";

const isNotEmpty = (value) => value.trim() !== "";

const CollectionForm = (props) => {
  const dispatch = useDispatch();
  const {
    value: collectionNameValue,
    isValid: collectionNameIsValid,
    hasError: collectionNameHasError,
    valueChangeHandler: collectionNameChangeHandler,
    inputBlurHandler: collectionNameBlurHandler,
    reset: resetCollectionName,
  } = useInput(isNotEmpty);

  const {
    value: colorValue,
    isValid: colorIsValid,
    hasError: colorHasError,
    valueChangeHandler: colorChangeHandler,
    inputBlurHandler: colorBlurHandler,
    reset: resetColor,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (collectionNameIsValid && colorIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (props.initialValues) {
      const { name, color } = props.initialValues;
      collectionNameChangeHandler({ target: { value: name } });
      colorChangeHandler({ target: { value: color } });
    }
  }, [props.initialValues]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    if (props.initialValues) {
      dispatch(
        editCollectionData({
          id: props.initialValues.id,
          name: collectionNameValue,
          color: colorValue,
        })
      );
    } else {
      dispatch(
        setCollectionData({
          id: uuidv4(),
          name: collectionNameValue,
          color: colorValue,
        })
      );
    }

    resetCollectionName();
    resetColor();

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler} className={classes["add-collection-form"]}>
        <h1>Add Collection</h1>
        <hr />
        <div className={classes.inputs}>
          <label htmlFor="collectionName">Name</label>
          <input
            id="collectionName"
            type="text"
            value={collectionNameValue}
            onChange={collectionNameChangeHandler}
            onBlur={collectionNameBlurHandler}
            className={classes.text}
            placeholder="Collection Name"
          />
          {collectionNameHasError && (
            <p className={classes["error-text"]}>
              Please enter a Collection Name
            </p>
          )}
          <label htmlFor="color">Color</label>
          <select
            className={classes.select}
            name="color"
            id="color"
            value={colorValue}
            onChange={colorChangeHandler}
            onBlur={colorBlurHandler}
          >
            <option value="" disabled>
              Select Color
            </option>
            {colors.map((color) => (
              <option key={color.name} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
          {colorHasError && (
            <p className={classes["error-text"]}>Please select a Color</p>
          )}
        </div>
        <hr />
        <div className={classes.actions}>
          <button
            type="button"
            onClick={props.onClose}
            className={classes["btn-secondary"]}
          >
            Cancel
          </button>
          <button
            disabled={!formIsValid}
            type="submit"
            className={classes["btn-primary"]}
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CollectionForm;
