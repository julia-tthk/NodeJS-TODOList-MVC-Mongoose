const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.postAllTasks);
router.post('/delete', taskController.deleteATask);

module.exports = router;