const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = db.define("Users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = User;
