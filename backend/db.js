const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000, // Increase timeout to 10s
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
  // Let Docker healthcheck and restart policy handle this
});

function startServer() {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });

  // Existing routes
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
    res.status(501).send('Not implemented');
  });

  app.put('/tasks/:id/complete', (req, res) => {
    res.status(501).send('Not implemented');
  });
}

// Initial connection attempt with longer delay
setTimeout(() => {
  exports.connect()
    .then(() => startServer())
    .catch((err) => {
      console.error(`❌ Initial connection failed: ${err.message}`);
      // Avoid immediate exit; let Docker restart
    });
}, 15000); // Increased to 15s to align with healthcheck start_period

module.exports = connection;