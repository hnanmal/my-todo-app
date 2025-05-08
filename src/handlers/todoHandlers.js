// src/handlers/todoHandlers.js
export function createTodoHandlers({ addTodo, toggleTodo, deleteTodo }) {
    return {
      handleAdd: (e, inputRef) => {
        e.preventDefault();
        const text = inputRef.current.value.trim();
        if (text) {
          addTodo(text);
          inputRef.current.value = "";
        }
      },
      handleToggle: (id) => toggleTodo(id),
      handleDelete: (id) => deleteTodo(id),
    };
  }
  