import React from "react";

import "components/Button.scss";
import classNames from "classnames";

// Button deals with all logic to do with buttons
export default function Button(props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         onClick={props.onClick}
         disabled={props.disabled}
         className={buttonClass}
      >
         {props.children}
      </button>
   );
}
