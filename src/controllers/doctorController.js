const Department = require('../models/Department');
const Doctor = require('../models/Doctor');

exports.createDoctor = async (req, res) => {
    try {
        const { first_name, last_name, email_id, contact_no, title, degree, department_id, fees, experience, profile } = req.body;

        const department = await Department.findByPk(department_id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        const newDoctor = await Doctor.create({
            first_name,
            last_name,
            email_id,
            contact_no,
            title,
            degree,
            department_id,
            fees,
            experience,
            profile,
        });

        res.status(201).json({ success: 'true', message: 'Doctor created successfully', data: newDoctor });
    } catch (error) {
        console.error('Error creating Doctor:', error);
        res.status(500).json({ error: 'Failed to create Doctor', details: error.message });
    }
};

exports.getDoctors = async (req, res) => {
    try {
      const doctor = await Doctor.findAll();
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doctor' });
    }
  };

exports.getDoctorById = async (req, res) => {
    try {
      const doctor = await Doctor.findByPk(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doctor' });
    }
  };

exports.updateDoctor = async (req, res) => {
    try {
      const doctor = await Doctor.findByPk(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      await doctor.update(req.body);
      res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update doctor' });
    }
  };

exports.deleteDoctor = async (req, res) => {
    try {
      const doctor = await Doctor.findByPk(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      await doctor.destroy();
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Doctor' });
    }
  };