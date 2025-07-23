const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
});

// Export connect function for healthcheck
exports.connect = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error(`❌ Failed to connect to MySQL: ${err.message}`);
        reject(err);
      } else {
        console.log("✅ Connected to MySQL Database");
        resolve();
      }
    });
  });
};

connection.on('error', (err) => {
  console.error(`❌ MySQL connection error: ${err.message}`);
});

// API Routes
app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM task', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

app.get('/tasks/counts', (req, res) => {
  connection.query('SELECT COUNT(*) as total, SUM(completed = FALSE) as pending FROM task', (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json({ total: results[0].total, pending: results[0].pending || 0 });
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;
  const query = 'INSERT INTO task (title, description, priority, category, dueDate) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, description, priority, category, dueDate], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

app.put('/tasks/:id/complete', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE task SET completed = TRUE WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    if (result.affectedRows === 0) return res.status(404).send('Task not found');
    res.status(200).send('Task marked as complete');
  });
});

// Server startup logic (moved outside for testing)
function startServer() {
  setTimeout(() => {
    exports.connect()
      .then(() => {
        app.listen(port, () => {
          console.log(`🚀 Server is running on port ${port}`);
        });
      })
      .catch((err) => {
        console.error(`❌ Initial connection failed: ${err.message}`);
      });
  }, 15000);
}

if (require.main === module) {
  startServer(); // Only start server if run directly
}

module.exports = app; // Export app for testing