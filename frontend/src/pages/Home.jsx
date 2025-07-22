import { useState, useEffect } from "react";
import { FaTasks, FaPlus, FaRegClock, FaTag } from "react-icons/fa";

const Home = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium Priority",
    category: "",
    dueDate: "",
  });

  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({ total: 0, pending: 0 });

  useEffect(() => {
    fetchTasks();
    fetchCounts();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks/counts");
      const data = await res.json();
      setCounts(data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      console.log("Task submitted:", data);
      fetchTasks();
      fetchCounts();
      setTask({
        title: "",
        description: "",
        priority: "Medium Priority",
        category: "",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const markTaskAsDone = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}/complete`, {
        method: "PUT",
      });
      fetchTasks();
      fetchCounts();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2 text-xl font-semibold text-indigo-600">
          <FaTasks className="text-2xl" />
          Taskly
        </div>
        <div className="text-sm text-gray-500">
          {counts.total} total tasks • {counts.pending} pending
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Form Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FaPlus className="text-indigo-500" /> Create New Task
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add a new task to your workflow and stay organized
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Task Title *</label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
                placeholder="Enter task title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Describe your task in detail..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={task.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select Category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Study">Study</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              + Add Task
            </button>
          </form>
        </div>

        {/* Task List Card */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FaRegClock className="text-indigo-500" /> Recent Tasks
          </h2>
          <p className="text-sm text-gray-500 mb-4">Your 5 most recently created tasks</p>

          {tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">
                <FaTag />
              </div>
              <p className="font-medium">No tasks yet</p>
              <p className="text-sm text-gray-500">Create your first task to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{t.title}</h3>
                    <p className="text-sm text-gray-600">{t.description}</p>
                    <p className="text-xs mt-1 text-gray-500">Due: {t.dueDate}</p>
                  </div>
                  <button
                    onClick={() => markTaskAsDone(t.id)}
                    className="text-sm px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Done
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
