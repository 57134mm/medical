const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Department = require('./Department');

const Doctor = sequelize.define('doctor', {
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
  email_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  contact_no: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  degree: {
    type: Sequelize.STRING,
    allowNull: false
  },
  department_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'departments',
      key: 'id'
    }
  },
  fees: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  experience: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  profile: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Doctor;