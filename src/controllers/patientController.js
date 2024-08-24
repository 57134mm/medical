const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
    try {
        const { first_name, last_name, gender, age, email_id, contact_no, current_address, profile, height, weight, blood_group, blood_pressure, pulse, respiration, allergy, diet } = req.body;

        const newPatient = await Patient.create({
            first_name,
            last_name,
            gender,
            age,
            email_id,
            contact_no,
            current_address,
            profile,
            height,
            weight,
            blood_group,
            blood_pressure,
            pulse,
            respiration,
            allergy,
            diet,
        });

        res.status(201).json({ success: 'true', message: 'Patient created successfully', data: newPatient });
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient', details: error.message });
    }
};


exports.getPatients = async (req, res) => {
    try {
      const patients = await Patient.findAll();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch patients' });
    }
  };

exports.getPatientById = async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch patient' });
    }
  };

exports.updatePatient = async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      await patient.update(req.body);
      res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update patient' });
    }
  };

exports.deletePatient = async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      await patient.destroy();
      res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete patient' });
    }
  };