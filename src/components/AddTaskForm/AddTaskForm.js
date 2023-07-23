import React, { useEffect } from "react";
import classes from "./AddTaskForm.module.css";
import Modal from "../UI/Modal";
import useInput from "../../hooks/use-input";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { editData, setData } from "../../store/task-actions";

const isNotEmpty = (value) => value.trim() !== "";

const AddTaskForm = (props) => {
  const today = new Date();
  const defaultValue = today.toISOString().substring(0, 10);

  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collection.collections);

  const {
    value: taskNameValue,
    isValid: taskNameIsValid,
    hasError: taskNameHasError,
    valueChangeHandler: taskNameChangeHandler,
    inputBlurHandler: taskNameBlurHandler,
    reset: resetTaskName,
  } = useInput(isNotEmpty);

  const {
    value: descriptionValue,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);

  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput(isNotEmpty);

  const {
    value: collectionValue,
    isValid: collectionIsValid,
    hasError: collectionHasError,
    valueChangeHandler: collectionChangeHandler,
    inputBlurHandler: collectionBlurHandler,
    reset: resetCollection,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (taskNameIsValid && dateIsValid && collectionIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (props.initialValues) {
      const { name, description, date, collection, color, collectionId } =
        props.initialValues;
      taskNameChangeHandler({ target: { value: name } });
      descriptionChangeHandler({ target: { value: description } });
      dateChangeHandler({ target: { value: date } });
      collectionChangeHandler({
        target: { value: `${collection} ${color} ${collectionId}` },
      });
    }
  }, [props.initialValues]);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const collection = collectionValue.split(" ");

    if (props.initialValues) {
      dispatch(
        editData({
          id: props.initialValues.id,
          name: taskNameValue,
          description: descriptionValue,
          date: dateValue,
          collection: collection[0],
          color: collection[1],
          collectionId: collection[2],
        })
      );
    } else {
      dispatch(
        setData({
          id: uuidv4(),
          name: taskNameValue,
          description: descriptionValue,
          date: dateValue,
          collection: collection[0],
          color: collection[1],
          collectionId: collection[2],
        })
      );
    }

    resetTaskName();
    resetDescription();
    resetDate();
    resetCollection();

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <form
        onSubmit={formSubmitHandler}
        method="post"
        className={classes["add-task-form"]}
      >
        <div className={classes["form-control"]}>
          <input
            type="text"
            id="taskname"
            value={taskNameValue}
            onChange={taskNameChangeHandler}
            onBlur={taskNameBlurHandler}
            className={classes.text}
            placeholder="Task name"
          />
          {taskNameHasError && (
            <p className={classes["error-text"]}>Please enter a Task Name</p>
          )}

          <input
            type="text"
            id="description"
            autoComplete="off"
            value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            className={classes.text}
            placeholder="Description (optional)"
          />
          <div>
            <input
              type="date"
              id="date"
              value={dateValue}
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
              placeholder="Due Date"
            />
            {dateHasError && (
              <p className={classes["error-text"]}>Please enter a Date</p>
            )}
          </div>
          <div className={classes["select-container"]}>
            <select
              className={classes.select}
              name="collection"
              id="collection"
              value={collectionValue}
              onChange={collectionChangeHandler}
              onBlur={collectionBlurHandler}
            >
              <option disabled value="">
                Select Collection
              </option>
              {collections.map((collection) => (
                <option
                  key={collection.name}
                  value={`${collection.name} ${collection.color} ${collection.id}`}
                >
                  {collection.name}
                </option>
              ))}
            </select>
            {collectionHasError && (
              <p className={classes["error-text"]}>
                Please select a Collection
              </p>
            )}
          </div>
        </div>
        <hr className={classes.hr} />
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
            {props.initialValues ? "Save" : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskForm;
