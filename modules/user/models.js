// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
  },
  refresh_token: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: true,
});

module.exports = User;
