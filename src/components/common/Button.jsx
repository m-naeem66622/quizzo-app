import React from "react";

function Button({ children, className = "", ...rest }) {
  return (
    <button
      {...rest}
      className={`rounded-md focus:outline-none bg-gradient-to-r text-white transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
