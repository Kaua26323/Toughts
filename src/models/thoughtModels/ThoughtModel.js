const { DataTypes } = require("sequelize");
const db = require("../../db/conn");
const User = require("../UserModel");
const catchErrors = require("../../errors/catchError");

const Thought = db.define("thoughts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Thought value is required" },
    },
  },
});

Thought.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Thought, { foreignKey: "userId" });

module.exports = Thought;
