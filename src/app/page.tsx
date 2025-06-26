'use client';
import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import AddTodoModal from './components/AddTodoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/lib/fontawesome';


type Todo = {
  id: number;
  title: string;
  completed?: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    if (!title.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const created: Todo = await res.json();
    setTodos([...todos, created]);
    setShowModal(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="max-w-xl w-full p-6   relative flex flex-col justify-between h-[800px]">
        <h1 className="text-lg  text-center mb-4 bg-purple-500 py-5 text-white rounded flex  ">
       <div>
        <FontAwesomeIcon icon="list" className="ps-2" />
        </div>  
        <div className=' mx-auto'>
          To-Do List App
          </div>  
        </h1>

        <div className="flex-1 overflow-y-auto space-y-2 py-5 px-2 md:px-8 mb-20 bg-white">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} refresh={fetchTodos} />
          ))}
        </div>

        {/* Fixed button to open modal */}
        <div className="relative bottom-26 left-0 right-0 flex justify-center ">
          <button
            className="bg-purple-500 text-white px-6 py-3 rounded-full shadow"
            onClick={() => setShowModal(true)}
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddTodoModal onAdd={addTodo} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
