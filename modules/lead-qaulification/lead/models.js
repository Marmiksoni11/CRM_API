// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const Leads = sequelize.define('leads', {
  lead_title: {
    type: DataTypes.TEXT,
  },
  company: {
    type: DataTypes.TEXT,
  },
  title: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  status_id: {
    type: DataTypes.INTEGER,
  }
},
{
  timestamps: true,
});

module.exports = Leads;
