// src/handlers/todoHandlers.js

export function createTodoHandlers({ addTodo, toggleTodo, deleteTodo }) {
  return {
    handleAdd: (e, text, tags = []) => {
      e.preventDefault();
      const trimmed = text.trim();
      if (trimmed) {
        addTodo(trimmed, tags); // ✅ Firestore 저장
        reset();             // ✅ 입력 필드 초기화
      }
    },
    handleToggle: (id) => toggleTodo(id),
    handleDelete: (id) => deleteTodo(id),
  };
}
