import React from "react";

const DateUI = (props) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = props.date.getMonth();
  const monthName = monthNames[month];
  const year = props.date.getFullYear();
  const date = props.date.getDate();
  const currentDate = date + " " + monthName + " " + year;
  return <p className={props.className}>{currentDate}</p>;
};

export default DateUI;
