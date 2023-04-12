import React, { useContext, useState } from "react";
import { isEmpty } from "lodash";
import TodoContext from "../contexts/TodoContext";
import AddNewToDo from "./AddNewToDo";
import Button from "./Button";

const Td = ({ id, key, children }) => (
  <td className="p-8" key={`${id}-${key}`}>
    {children}
  </td>
);

const generateTableData = (data, key, id) => {
  let render = null;
  switch (key) {
    case "timeStamp":
    case "dueDate":
    case "title":
    case "description":
    case "status": {
      render = (
        <Td id={id} key={key}>
          {data}
        </Td>
      );
      break;
    }
    case "tags": {
      render = (
        <Td id={id} key={key}>
          <div className="flex flex-wrap">
            {!isEmpty(data) ? (
              data.map((tag) => (
                <span
                  className="w-fit m-2 p-2 outline-none border bg-gray-100"
                  key={tag.key}
                >
                  {tag.label}
                </span>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        </Td>
      );
      break;
    }
    default: {
      break;
    }
  }
  return render;
};

const TodoList = () => {
  const {
    currentPageTodos: todos = [],
    toggleRecordEdit,
    deleteTodo,
  } = useContext(TodoContext);

  return (
    <tbody className="text-left text-lg">
      {!isEmpty(todos) &&
        todos.map((todo = {}) => {
          const { id, isEditing } = todo;
          return (
            <tr key={id}>
              {!isEditing ? (
                <>
                  {Object.entries(todo).map((item = []) =>
                    generateTableData(item[1], item[0], id)
                  )}
                  <td className="p-8">
                    <Button
                      onClick={() => {
                        toggleRecordEdit(id, true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => deleteTodo(id)}>Delete</Button>
                  </td>
                </>
              ) : (
                <>
                  <AddNewToDo
                    todoData={todo}
                    showInputLabels={false}
                    showAddButton={false}
                    showEditFields={true}
                    isEditing={isEditing}
                  />
                </>
              )}
            </tr>
          );
        })}
    </tbody>
  );
};

export default TodoList;
