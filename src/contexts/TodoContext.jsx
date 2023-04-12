import React, { useCallback, useEffect, useState } from "react";
import { PAGE_SIZE } from "../helpers";

const defaultData = [
  {
    id: 6247485045,
    timeStamp: "2023-04-09",
    title: "title1",
    description: "description1",
    dueDate: "2023-04-20",
    tags: [
      { key: "tag1", label: "tag1" },
      { key: "tag2", label: "tag2" },
    ],
    status: "Open",
    isEditing: false,
  },
  {
    id: 6246912292,
    timeStamp: "2023-04-01",
    title: "title2",
    description: "description2",
    dueDate: "2023-04-10",
    tags: [{ key: "tag2", label: "tag2" }],
    status: "Overdue",
    isEditing: false,
  },
];

const TodoContext = React.createContext(defaultData);

export function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState(defaultData || []);
  const [currentPageTodos, setCurrentPageTodos] = useState(defaultData);
  const [currentPage, setCurrentPage] = useState(0);
  const [emptyRecordAdded, setEmptyRecordAdded] = useState(false);

  useEffect(() => {
    setCurrentPageTodos(
      todos.slice(2 * currentPage, 2 * currentPage + PAGE_SIZE)
    );
  }, [currentPage, todos]);

  const addTodo = useCallback((data) => {
    setTodos((prev) => [...prev, data]);
  }, []);

  const updateTodo = useCallback((toUpdateTodo) => {
    setTodos((prev) => {
      return prev.map((item) => {
        if (item.id === toUpdateTodo.id) return toUpdateTodo;
        return item;
      });
    });
  }, []);

  const deleteTodo = useCallback((todoId) => {
    setTodos((prev) => prev.filter((item) => item.id !== todoId));
  }, []);

  const toggleRecordEdit = useCallback((todoId, bool) => {
    setTodos((prev) => {
      return prev
        .map((item) => {
          if (item.id === todoId) {
            return { ...item, isEditing: bool };
          }
          return item;
        })
        .filter((item) => {
          if (item.title) return item;
        });
    });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        currentPageTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleRecordEdit,
        currentPage,
        setCurrentPage,
        emptyRecordAdded,
        setEmptyRecordAdded,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
