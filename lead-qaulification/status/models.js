// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const Status = sequelize.define('leads', {
  title: {
    type: DataTypes.TEXT,
  },
  color: {
    type: DataTypes.TEXT,
  }
},
{
  timestamps: true,
});

3

module.exports = Status;
