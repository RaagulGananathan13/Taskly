// routes/tasks.js
const express = require('express');
const router = express.Router();
const {
  getRecentTasks,
  createTask,
  markTaskComplete,
  getTaskCounts,
} = require('../controllers/taskController');

router.get('/', getRecentTasks);
router.post('/', createTask);
router.put('/:id/complete', markTaskComplete);
router.get('/counts', getTaskCounts);

module.exports = router;
