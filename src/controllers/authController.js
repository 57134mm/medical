const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const { SECRET_KEY } = require('../config/config');

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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ where: { email_id: email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email address' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email_id, role: user.role_id },
            SECRET_KEY,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send response
        res.status(200).json({
            message: 'Login successful',
            user: user,
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password', 'confirm_password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password do not match' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await user.update({
            password: hashedNewPassword
        });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};