import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo._id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  const submitEdit = async (id) => {
    if (!editTitle.trim()) return;
    try {
      await axios.put(`${API_URL}/${id}`, { title: editTitle });
      setEditId(null);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        My Todo List
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className="flex-1 p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 font-medium"
        >
          Add
        </button>
      </form>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 italic">No tasks yet.</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between border-b pb-2 group"
            >
              {editId === todo._id ? (
                <div className="flex flex-1 gap-2">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 border p-1 rounded outline-none focus:ring-1 ring-blue-400"
                    autoFocus
                  />
                  <button
                    onClick={() => submitEdit(todo._id)}
                    className="text-green-600 font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => toggleComplete(todo)}
                    className={`flex-1 cursor-pointer transition ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.title}
                  </span>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => startEdit(todo)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
