import { FaPlus } from "react-icons/fa";

const TaskForm = ({ task, handleChange, handleSubmit }) => {
  return (
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
  );
};

export default TaskForm;
