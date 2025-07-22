const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tasksRouter = require('./routes/tasks');
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
