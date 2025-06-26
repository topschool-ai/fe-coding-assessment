'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/lib/fontawesome";

export default function TodoItem({ todo, refresh}) {
  // State to manage whether the todo title is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the current value of the editable title input
  const [editTitle, setEditTitle] = useState(todo.title);

  // Function to toggle the completed status of a todo
  const toggleComplete = async () => {
    const payload = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,  // Toggle completed boolean
    };
    console.log("Toggle Complete - Request payload:", payload);

    // Send a PUT request to update the todo status on the server
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Toggle Complete - Response status:", res.status);
    // Refresh the list after the update
    refresh();
  };

  // Function to save the edited todo title
  const saveEdit = async () => {
    const payload = {
      id: todo.id,
      title: editTitle, // Use the edited title
    };
    console.log("Save Edit - Request payload:", payload);

    // Send a PUT request to update the todo title on the server
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Save Edit - Response status:", res.status);
    // Exit editing mode
    setIsEditing(false);
    // Refresh the list after the update
    refresh();
  };

  // Function to delete the todo item
  const deleteTodo = async () => {
    const payload = { id: todo.id };
    console.log("Delete Todo - Request payload:", payload);

    // Send a DELETE request to remove the todo from the server
    const res = await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Delete Todo - Response status:", res.status);
    // Refresh the list after deletion
    refresh();
  };

  return (
    <div className="flex items-center justify-between p-3 ">
      <div className="flex items-center gap-3">
        {/* Custom styled checkbox for toggling completion */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="w-5 h-5 rounded-full border-2 border-gray-400 appearance-none cursor-pointer
             checked:bg-blue-600 checked:border-blue-600 relative
             before:content-['✔'] before:absolute before:inset-0 before:flex before:items-center before:justify-center
             before:text-white before:text-sm before:opacity-0 checked:before:opacity-100 transition"
        />

        {/* Editable input shown when in edit mode, else display title with truncation */}
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
            title={todo.title}  // Tooltip to show full title on hover
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Buttons for edit/save and delete */}
      <div className="space-x-2">
        {isEditing ? (
          // Save button when editing
          <button className="text-green-600" onClick={saveEdit}>
            <FontAwesomeIcon icon="check" className="" />
          </button>
        ) : (
          // Edit button when not editing
          <button className="" onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon="pen" className="" />
          </button>
        )}
        {/* Delete button */}
        <button className="" onClick={deleteTodo}>
          <div>
            <FontAwesomeIcon icon="trash" className="" />
          </div>
        </button>
      </div>
    </div>
  );
}
