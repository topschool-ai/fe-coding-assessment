'use client';
import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import AddTodoModal from './components/AddTodoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/lib/fontawesome';

// Define Todo type for better type safety
type Todo = {
  id: number;
  title: string;
  completed?: boolean;
};

export default function Home() {
  // State to hold the list of todos
  const [todos, setTodos] = useState<Todo[]>([]);
  // State to control visibility of Add Todo modal
  const [showModal, setShowModal] = useState(false);

  // Fetch all todos from the API
  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  // On component mount, load the todos
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo by calling the API and updating state
  const addTodo = async (title: string) => {
    if (!title.trim()) return; // Prevent adding empty tasks

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    const created: Todo = await res.json();

    // Append the newly created todo to the list and close modal
    setTodos([...todos, created]);
    setShowModal(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full p-6 relative flex flex-col justify-between h-[800px]">
        {/* Header with icon and title */}
        <h1 className="text-lg text-center mb-4 bg-purple-500 py-5 text-white rounded flex items-center">
          <div>
            <FontAwesomeIcon icon="list" className="ps-2" />
          </div>
          <div className="mx-auto">
            To-Do List App
          </div>
        </h1>

        {/* Scrollable todo list container */}
        <div className="flex-1 overflow-y-auto space-y-2 py-5 px-2 md:px-8 mb-20 bg-white rounded shadow">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} refresh={fetchTodos} />
          ))}
        </div>

        {/* Fixed button at bottom center to open AddTodoModal */}
        <div className="relative bottom-0 left-0 right-0 flex justify-center">
          <button
            className="bg-purple-500 text-white px-6 py-3 rounded-full shadow hover:bg-purple-600 transition"
            onClick={() => setShowModal(true)}
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Conditionally render the modal for adding todos */}
      {showModal && (
        <AddTodoModal onAdd={addTodo} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
