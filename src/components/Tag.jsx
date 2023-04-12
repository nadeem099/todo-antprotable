import React, { useState } from "react";

const Tag = ({ item, toggleItemEditing, handleKeyDown }) => {
  const [input, setInput] = useState(item.label);

  return (
    <>
      {item.editing ? (
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, input, "update", item.key)}
          onBlur={(e) => handleKeyDown(e, input, "update", item.key)}
          className="w-12 m-2 p-2 outline-none border-2"
        />
      ) : (
        <span
          className="p-2 bg-gray-100 border rounded m-2 hover:bg-transparent hover:border-2 active:bg-transparent active:border-2"
          onClick={() => toggleItemEditing(item)}
        >
          {item.label}
        </span>
      )}
    </>
  );
};

export default Tag;
