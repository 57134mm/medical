const express = require('express');
const departmentController = require('../controllers/departmentController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', departmentController.createDepartment); 

module.exports = router;