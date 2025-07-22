// controllers/taskController.js
const db = require('../db');

// Get 5 recent incomplete tasks
exports.getRecentTasks = (req, res) => {
  const query = 'SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT 5';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;
  const query = 'INSERT INTO task (title, description, priority, category, dueDate) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, priority, category, dueDate], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, message: 'Task created successfully' });
  });
};

// Mark task as completed
exports.markTaskComplete = (req, res) => {
  const taskId = req.params.id;
  const query = 'UPDATE task SET completed = TRUE WHERE id = ?';
  db.query(query, [taskId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task marked as completed' });
  });
};
