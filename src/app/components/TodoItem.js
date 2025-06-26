"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/lib/fontawesome";

export default function TodoItem({ todo, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // Toggle completed status
  const toggleComplete = async () => {
    const payload = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
    };
    console.log("Toggle Complete - Request payload:", payload);

    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Toggle Complete - Response status:", res.status);
    refresh();
  };

  // Save edited title
  const saveEdit = async () => {
    const payload = {
      id: todo.id,
      title: editTitle,
    };
    console.log("Save Edit - Request payload:", payload);

    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Save Edit - Response status:", res.status);
    setIsEditing(false);
    refresh();
  };

  // Delete todo
  const deleteTodo = async () => {
    const payload = { id: todo.id };
    console.log("Delete Todo - Request payload:", payload);

    const res = await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Delete Todo - Response status:", res.status);
    refresh();
  };

  return (
    <div className="flex items-center justify-between p-3 ">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="w-5 h-5 rounded-full border-2 border-gray-400 appearance-none cursor-pointer
             checked:bg-blue-600 checked:border-blue-600 relative
             before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center
             before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 transition"
        />
        {isEditing ? (
          <input
            className="border px-2 py-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <span
            className={`truncate max-w-[180px] sm:max-w-[300px] lg:max-w-[300px] text-sm sm:text-base ${
              todo.completed ? "line-through text-gray-200" : ""
            }`}
            title={todo.title}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className="space-x-2">
        {isEditing ? (
          <button className="text-green-600" onClick={saveEdit}>
            <FontAwesomeIcon icon="check" className="" />
          </button>
        ) : (
          <button className="" onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon="pen" className="" />
          </button>
        )}
        <button className="" onClick={deleteTodo}>
          <div>
            <FontAwesomeIcon icon="trash" className="" />
          </div>
        </button>
      </div>
    </div>
  );
}
