const TaskItem = ({ task, onDone }) => {
  return (
    <li className="p-4 border rounded-lg bg-gray-50 shadow-sm flex justify-between items-center hover:shadow-md transition">
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs mt-1 text-gray-500">Due: {task.dueDate}</p>
      </div>
      <button
        onClick={() => onDone(task.id)}
        className="text-sm px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Done
      </button>
    </li>
  );
};

export default TaskItem;
