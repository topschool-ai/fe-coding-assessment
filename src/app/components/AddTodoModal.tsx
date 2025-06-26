'use client';
import { useState } from 'react';

type Props = {
  onAdd: (title: string) => void;
  onClose: () => void;
};

export default function AddTodoModal({ onAdd, onClose }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter task title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 text-black"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
