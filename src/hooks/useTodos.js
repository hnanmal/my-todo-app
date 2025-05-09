// src/hooks/useTodos.js
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


export function useTodos() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const snapshot = await getDocs(collection(db, "todos"));
    const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(loaded);
  };

  const addTodo = async (text) => {
    const docRef = await addDoc(collection(db, "todos"), { text, done: false });
    setTodos(prev => [...prev, { id: docRef.id, text, done: false }]);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    const updated = { ...todo, done: !todo.done };
    await updateDoc(doc(db, "todos", id), { done: updated.done });
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo };
}
