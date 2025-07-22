import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

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
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const fetchCounts = async () => {
    const res = await fetch("http://localhost:5000/tasks/counts");
    const data = await res.json();
    setCounts(data);
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    fetchTasks();
    fetchCounts();
    setTask({
      title: "",
      description: "",
      priority: "Medium Priority",
      category: "",
      dueDate: "",
    });
  };

  const markTaskAsDone = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}/complete`, {
      method: "PUT",
    });
    fetchTasks();
    fetchCounts();
  };

  return (
    <div className="p-6">
      <Header total={counts.total} pending={counts.pending} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TaskForm task={task} handleChange={handleChange} handleSubmit={handleSubmit} />
        <TaskList tasks={tasks} markTaskAsDone={markTaskAsDone} />
      </div>
    </div>
  );
};

export default Home;
