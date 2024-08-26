const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Receptionist = sequelize.define('receptionist', {
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
    allowNull: false
  },
  contact_no: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  profile: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Receptionist;
