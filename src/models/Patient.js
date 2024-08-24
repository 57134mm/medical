const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Patient = sequelize.define('patient', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  contact_no: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  current_address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profile: {
    type: Sequelize.STRING,
    allowNull: false
  },
  height: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  blood_group: {
    type: Sequelize.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: false
  },
  blood_pressure: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pulse: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  respiration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  allergy: {
    type: Sequelize.STRING,
    allowNull: false
  },
  diet: {
    type: Sequelize.ENUM('Vegetarian', 'Non-Vegetarian', 'Vegan', 'Other'),
    allowNull: false
  },
});

module.exports = Patient;