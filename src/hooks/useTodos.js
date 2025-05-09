// src/hooks/useTodos.js
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  // ✅ 실시간 동기화
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(loaded);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  // ✅ 추가
  const addTodo = async (text, tags = []) => {
    await addDoc(collection(db, "todos"), {
      text,
      done: false,
      tags,
      createdAt: serverTimestamp() // ✅ 수정된 부분
    });
  };

  // ✅ 완료 토글
  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    await updateDoc(doc(db, "todos", id), { done: !todo.done });
  };

  // ✅ 삭제
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // ✅ 태그 업데이트
  const updateTags = async (id, tags) => {
    await updateDoc(doc(db, "todos", id), { tags });
  };

  return { todos, addTodo, toggleTodo, deleteTodo, updateTags };
}
