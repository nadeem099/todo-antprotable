import React from "react";
import MasterLayout from "./layout/MasterLayout";
import { TodoContextProvider } from "./contexts/TodoContext";
import { TodoList } from "./components";

function App() {
  return (
    <TodoContextProvider>
      <MasterLayout>
        <TodoList />
      </MasterLayout>
    </TodoContextProvider>
  );
}

export default App;
