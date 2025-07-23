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

  // Use Vite environment variable for API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchTasks();
    fetchCounts();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCounts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/counts`);
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
      await fetch(`${API_BASE_URL}/tasks`, {
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
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const markTaskAsDone = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
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
      <Header total={counts.total} pending={counts.pending} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TaskForm task={task} handleChange={handleChange} handleSubmit={handleSubmit} />
        <TaskList tasks={tasks} markTaskAsDone={markTaskAsDone} />
      </div>
    </div>
  );
};

export default Home;