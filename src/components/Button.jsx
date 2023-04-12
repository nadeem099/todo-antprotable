import React from "react";

function Button({ children, onClick, sx }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 text-lg underline text-blue-700 hover:text-blue-950 ${sx}`}
    >
      {children}
    </button>
  );
}

export default Button;
