const express = require('express');
const doctorController = require('../controllers/doctorController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', doctorController.createDoctor); 

module.exports = router;