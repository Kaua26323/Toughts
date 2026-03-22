const { Sequelize } = require("sequelize");

const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao TiDB com sucesso!"))
  .catch((err) => console.error("Erro ao autenticar no banco:", err));

module.exports = sequelize;
