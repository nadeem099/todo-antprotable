import React, { useState, useContext, useEffect } from "react";
import PropType from "prop-types";
import isEmpty from "lodash/isEmpty";
import TodoContext from "../contexts/TodoContext";
import Button from "./Button";
import {
  statusEnum,
  fields,
  constructTodo,
  constructEmptyTodo,
} from "../helpers";
import Tags from "./Tags";

const defaultNewTodoState = {
  title: "",
  description: "",
  dueDate: "",
  status: "Open",
};

// Reusable to add/edit todos
const AddNewToDo = ({ showEditFields, showAddButton, todoData, isEditing }) => {
  const [newTodo, setNewTodo] = useState(todoData || defaultNewTodoState); // to hold new/editing todo
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
  });
  const [showFields, setShowFields] = useState(showEditFields); // to show/hide input fields
  const {
    todos,
    addTodo,
    updateTodo,
    toggleRecordEdit,
    setCurrentPage,
    emptyRecordAdded,
    setEmptyRecordAdded,
  } = useContext(TodoContext);

  // handle change of any input field
  const handleChange = ({ value, name }) => {
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  // handle when save is pressed (save new record/update existing record)
  const onSave = (e) => {
    e.preventDefault();

    const hasTitleError = isEmpty(newTodo?.title);
    const hasDescriptionError = isEmpty(newTodo?.description);
    // check for errors for mandatory fields
    if (
      (hasTitleError && hasDescriptionError) ||
      hasTitleError ||
      hasDescriptionError
    ) {
      setFormErrors((prev) => ({
        ...prev,
        title: isEmpty(newTodo?.title),
        description: isEmpty(newTodo?.description),
      }));
      return;
    } else {
      setFormErrors((prev) => ({
        ...prev,
        title: false,
        description: false,
      }));
    }

    // create and add/update new/existing todo to the context
    const todo = constructTodo(newTodo, isEditing);
    if (isEditing) {
      updateTodo(todo);
    } else {
      addTodo(todo);
    }
    // reset local states
    setNewTodo(defaultNewTodoState);
    setShowFields(false);
    setEmptyRecordAdded(false);
  };

  const onCancel = () => {
    if (isEditing) toggleRecordEdit(todoData.id, false);
    else {
      setNewTodo(defaultNewTodoState);
      setShowFields(false);
    }
    setEmptyRecordAdded(false);
  };

  const setFields = () => {
    setEmptyRecordAdded(true);
    if (!emptyRecordAdded) {
      const emptyRecord = constructEmptyTodo();
      addTodo(emptyRecord);
      setCurrentPage(Math.floor(todos.length / 2));
    }
  };

  return (
    <>
      {showFields && (
        <>
          {fields.map(({ name }) => {
            const dueDate = new Date(newTodo.dueDate);
            return (
              <td key={name} className="p-8">
                {/** show time stamp only when it is editing, hide in rest of the cases */}
                {name === "timeStamp" && <span>{todoData?.timeStamp}</span>}
                {/** show input fields for title/description/due-date */}
                {(name === "title" ||
                  name === "description" ||
                  name === "dueDate") && (
                  <>
                    <input
                      id={`new-todo-${name}`}
                      name={name}
                      className="p-2 outline-none border"
                      type={name === "dueDate" ? "date" : "text"}
                      value={newTodo[name]}
                      maxLength={
                        name === "title" ? 100 : name === "description" && 1000
                      }
                      onChange={(e) => handleChange(e.target)}
                    />
                    {/** errors for title and description (mandatory fields) */}
                    {(name === "title" || name === "description") &&
                    (formErrors?.title || formErrors?.description) ? (
                      <span className="text-red-600">
                        required<sup>*</sup>
                      </span>
                    ) : null}
                  </>
                )}
                {/** show drop down for status (hide for timeStamp) */}
                {name === "status" && (
                  <select
                    id={`new-todo-${name}`}
                    name={name}
                    value={newTodo[name]}
                    onChange={(e) => handleChange(e.target)}
                  >
                    <option>{statusEnum.open}</option>
                    <option>{statusEnum.working}</option>
                    <option>{statusEnum.done}</option>
                    <option>{statusEnum.overdue}</option>
                  </select>
                )}
                {name === "tags" && (
                  <Tags
                    name={name}
                    tags={newTodo.tags}
                    isEditing={isEditing}
                    updateTagInTodo={setNewTodo}
                  />
                )}
              </td>
            );
          })}
          {/** every record cancel and save button when editing */}
          <td className="p-8">
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onSave}>Save</Button>
          </td>
        </>
      )}
      {showAddButton && (
        <Button
          sx="border text-xl no-underline my-4"
          onClick={() => setFields()}
        >
          Add Todo
        </Button>
      )}
    </>
  );
};

export default AddNewToDo;

AddNewToDo.defaultProps = {
  showEditFields: false,
  showInputLabels: false,
  showAddButton: true,
};

AddNewToDo.prototype = {
  showEditFields: PropType.bool,
  showInputLabels: PropType.bool,
  showAddButton: PropType.bool,
  todoData: PropType.shape({}),
};
