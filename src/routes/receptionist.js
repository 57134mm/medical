const express = require('express');
const receptionistController = require('../controllers/receptionistController');

const router = express.Router();

router.post('/', receptionistController.createReceptionist); 

module.exports = router;