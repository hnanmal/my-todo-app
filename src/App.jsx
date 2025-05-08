// src/App.jsx
import { useRef } from "react";
import { useTodos } from "./hooks/useTodos";
import { createTodoHandlers } from "./handlers/todoHandlers";
import TodoItem from "./components/TodoItem";

export default function App() {
  const inputRef = useRef();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { handleAdd, handleToggle, handleDelete } = createTodoHandlers({
    addTodo, toggleTodo, deleteTodo,
  });

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center pt-10 overflow-y-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 px-4 text-center">
        📝 Todo 메모장
      </h1>

      <form
        onSubmit={(e) => handleAdd(e, inputRef)}
        className="flex flex-col sm:flex-row gap-2 mb-6 w-full px-4 max-w-md"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="할 일을 입력하세요"
          className="flex-1 px-4 py-3 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600"
        >
          추가
        </button>
      </form>

      <ul className="w-full max-w-md px-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
