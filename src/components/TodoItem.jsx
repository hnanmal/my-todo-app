// src/components/TodoItem.jsx
export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
      <li className="flex items-center justify-between px-4 py-3 bg-white rounded shadow mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
          />
          <span className={todo.done ? "line-through text-gray-400" : ""}>
            {todo.text}
          </span>
        </div>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      </li>
    );
  }
  