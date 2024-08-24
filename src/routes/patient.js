const express = require('express');
const patientController = require('../controllers/patientController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', patientController.createPatient); 
router.get('/patient', verifyToken, patientController.getPatients);
router.get('/patient/:id', verifyToken, patientController.getPatientById);
router.put('/patient/:id', verifyToken, patientController.updatePatient);
router.delete('/patient/:id', verifyToken, patientController.deletePatient);

module.exports = router;