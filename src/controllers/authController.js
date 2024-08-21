const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');

exports.register = async (req, res) => {
    try {
        const { 
            firstName,
            lastName, 
            email, 
            password, 
            confirmPassword 
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const role = await Role.findOne({ where: { name: 'patient' } });
        if (!role) {
            return res.status(400).json({ message: 'Patient role does not exist' });
        }

        const existingUser = await User.findOne({ where: { email_id: email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email_id: email,
            password: hashedPassword,
            confirm_password: hashedConfirmPassword,
            role_id: role.id
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'Email already in use' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
