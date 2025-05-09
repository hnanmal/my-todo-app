// src/App.jsx
import { useState } from "react";

import { useTodos } from "./hooks/useTodos";
import { createTodoHandlers } from "./handlers/todoHandlers";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import TagFilter from "./components/TagFilter";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTags } = useTodos();
  const { handleAdd, handleToggle, handleDelete } = createTodoHandlers({
    addTodo, toggleTodo, deleteTodo,
  });
  const [activeFilterTag, setActiveFilterTag] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const visibleTodos =
    activeTags.length === 0
      ? todos
      : todos.filter(todo =>
          (todo.tags || []).some(tag => activeTags.includes(tag))
        );


  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center pt-10 overflow-y-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 px-4 text-center">
        📝 Todo 메모장
      </h1>

      <TodoInput onAdd={(text) => addTodo(text)} />

      <TagFilter
        todos={todos}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
      />

      <ul className="w-full max-w-md px-4">
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdateTags={updateTags}
          />
        ))}
      </ul>
    </div>
  );
}
