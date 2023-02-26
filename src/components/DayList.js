import React from "react";
import DayListItem from "./DayListItem";

// the DayList function displays each day on the side-bar and all logic to do with that
export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.onChange}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
}