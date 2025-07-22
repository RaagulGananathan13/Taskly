import { useState } from "react";
import { FaTasks, FaPlus, FaRegClock, FaTag, FaCalendarAlt } from "react-icons/fa";

const Home = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium Priority",
    category: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend API here to submit task
    console.log("Task submitted:", task);
    // Reset form
    setTask({
      title: "",
      description: "",
      priority: "Medium Priority",
      category: "",
      dueDate: "",
    });
  };

  return (
    <div className="p-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2 text-xl font-semibold text-indigo-600">
          <FaTasks className="text-2xl" />
          Taskly
        </div>
        <div className="text-sm text-gray-500">0 total tasks • 0 pending</div>
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

          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">
              <FaTag />
            </div>
            <p className="font-medium">No tasks yet</p>
            <p className="text-sm text-gray-500">Create your first task to get started!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
