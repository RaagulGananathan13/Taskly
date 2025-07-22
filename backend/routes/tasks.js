// routes/tasks.js
const express = require('express');
const router = express.Router();
const {
  getRecentTasks,
  createTask,
  markTaskComplete,
} = require('../controllers/taskController');

router.get('/', getRecentTasks);
router.post('/', createTask);
router.put('/:id/complete', markTaskComplete);

module.exports = router;
