const Receptionist = require('../models/Receptionist');

exports.createReceptionist = async (req, res) => {
    try {
        const { first_name, last_name, email_id, contact_no, profile } = req.body;

        const newReceptionist = await Receptionist.create({
            first_name,
            last_name,
            email_id,
            contact_no,
            profile
        });

        res.status(201).json({ message: 'Receptionist created successfully', data: newReceptionist });
    } catch (error) {
        console.error('Error creating Receptionist:', error);
        res.status(500).json({ error: 'Failed to create Receptionist', details: error.message });
    }
};