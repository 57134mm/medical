const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
    try {
        const { department_name, description } = req.body;

        const newDepartment = await Department.create({
            department_name,
            description,
        });

        res.status(201).json({ message: 'Department created successfully', data: newDepartment });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ error: 'Failed to create department', details: error.message });
    }
};