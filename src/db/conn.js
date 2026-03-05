const { Sequelize } = require("sequelize");

const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSAWORD;
const dbHost = process.env.DATABASE_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection with successfully!");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

module.exports = sequelize;
