import React from "react";

// the header displays above each appointment and shows what time the appointment is 
export default function Header(props) {

  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}

