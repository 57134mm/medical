const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login)

router.get('/user', verifyToken, authController.getUser);
router.put('/user', verifyToken, authController.updateUser);
router.put('/change-password', verifyToken, authController.changePassword);

module.exports = router;