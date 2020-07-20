import React, { Fragment } from "react";

export default function ListApp(props) {
  const deleteItem = () => {
    props.delete();
  };

  const changeTask = () => {
    props.changeTask();
  };

  const showCalendar = () => {
    props.show();
  };

  return (
    <Fragment>
      <li>
        <button onClick={() => changeTask()}>{props.task}</button>
        <button onClick={() => deleteItem()} className="Button_Delete_Habit">
          x
        </button>
      </li>
    </Fragment>
  );
}
