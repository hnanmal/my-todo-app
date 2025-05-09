import { useState, useEffect, useRef } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onUpdateTags }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(todo.tags || []);
  const inputRef = useRef();

  const toggleExpanded = () => setIsExpanded(prev => !prev);
  
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !tags.includes(tag)) {
        const updated = [...tags, tag];
        setTags(updated);
        setTagInput("");
        onUpdateTags(todo.id, updated); // ✅ Firestore 업데이트
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updated = tags.filter(t => t !== tagToRemove);
    setTags(updated);
    onUpdateTags(todo.id, updated);
  };

  return (
    <li className="bg-white rounded shadow p-4 mb-2">
      <div 
        className="flex items-center justify-between"
        // onClick={toggleExpanded}
      >
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => {
              onToggle(todo.id);
              e.stopPropagation(); // ✅ 확장 방지
            }}
          />
          <span 
            onClick={toggleExpanded}
            className={`cursor-pointer ${
              todo.done ? "line-through text-gray-400" : ""
            }`}
          >
              {todo.text}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ 확장 방지
            onDelete(todo.id);
          }}
          className="text-red-500"
        >
          삭제
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-200 text-sm px-2 py-0.5 rounded"
              >
                #{tag}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(tag);
                  }}
                  className="ml-1 text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="태그 입력 후 Enter"
            className="w-full border px-3 py-1 rounded text-sm"
          />
        </div>
      )}
    </li>
  );
}
