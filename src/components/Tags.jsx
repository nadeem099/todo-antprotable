import React, { useEffect, useState } from "react";
import Tag from "./Tag";

const Tags = ({ name, tags = [], updateTagInTodo }) => {
  const [tagInputs, setTagInputs] = useState(() =>
    tags?.map((item) => ({ ...item, editing: false }))
  );

  const [newTagInput, setNewTagInput] = useState("");

  useEffect(() => {
    setTagInputs(tags?.map((item) => ({ ...item, editing: false })));
  }, [tags]);

  const handleKeyDown = (e, keyDownInput, operation, key) => {
    if (e.keyCode === 13 && keyDownInput) {
      updateTagInTodo((prev) => {
        const { tags = [] } = prev;
        let filteredTag = tags;
        if (operation === "update") {
          filteredTag = tags.map((item) => {
            if (item.key === key)
              return { key: keyDownInput, label: keyDownInput };
            return item;
          });
        } else if (
          operation === "create" &&
          !tags?.some((item) => item.key === keyDownInput)
        ) {
          filteredTag = [...tags, { key: keyDownInput, label: keyDownInput }];
        }
        return {
          ...prev,
          tags: filteredTag,
        };
      });
      setNewTagInput("");
    }
  };

  const toggleItemEditing = (item) => {
    setTagInputs((prev) =>
      prev.map((elem) => {
        if (elem.key === item.key) {
          return { ...elem, editing: true };
        }
        return elem;
      })
    );
  };

  return (
    <>
      <div className="flex flex-wrap">
        {tagInputs?.map((item) => {
          return (
            <Tag
              item={item}
              toggleItemEditing={toggleItemEditing}
              handleKeyDown={handleKeyDown}
            />
          );
        })}
      </div>
      <input
        id={`new-todo-${name}`}
        name={name}
        className="w-12 m-2 p-2 outline-none border-2"
        type="text"
        value={newTagInput}
        onChange={(e) => setNewTagInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, newTagInput, "create")}
      />
    </>
  );
};

export default Tags;
