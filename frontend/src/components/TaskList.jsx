import { FaRegClock, FaTag } from "react-icons/fa";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, markTaskAsDone }) => {
  return (
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
            <TaskItem key={t.id} task={t} onDone={markTaskAsDone} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
