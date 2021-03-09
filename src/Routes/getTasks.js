const express = require("express");
const taskController = require('../Controllers/getTasks');
const router = express.Router()



router.get('/getTasks', taskController.getTasks);
router.post('/addTask', taskController.postTask);
router.delete('/deleteTasks', taskController.deleteTask)
router.put('/editTasks', taskController.editTasks);

module.exports = router;