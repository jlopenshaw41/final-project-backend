const Sequelize = require('sequelize');
const SubscriberModel = require('./subscriber');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });
  const Subscriber = SubscriberModel(connection, Sequelize);
  connection.sync({ alter: true });
  return {
    Subscriber,
  };
};

module.exports = setupDatabase();
