import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed); // ✅ 태그 없이 텍스트만 전달
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6 w-full px-4 max-w-md">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="flex-1 px-4 py-3 rounded border border-gray-300 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </form>
  );
}
