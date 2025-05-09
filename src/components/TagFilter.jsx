// src/components/TagFilter.jsx
export default function TagFilter({ todos, activeTags, setActiveTags }) {
    const allTags = [...new Set(todos.flatMap(todo => todo.tags || []))];
  
    const toggleTag = (tag) => {
        setActiveTags((prev) =>
          prev.includes(tag)
            ? prev.filter((t) => t !== tag)
            : [...prev, tag]
        );
      };

    const clearTags = () => setActiveTags([]);

    if (allTags.length === 0) return null;
  
    return (
        <div className="flex gap-2 flex-wrap justify-center mb-4 px-4">
          <button
            onClick={clearTags}
            className={`px-3 py-1 rounded-full text-sm border ${
              activeTags.length === 0
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            전체 보기
          </button>
    
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm border ${
                activeTags.includes(tag)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      );
  }
  