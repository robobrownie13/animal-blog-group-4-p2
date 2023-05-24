const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.EXPENSE_URL) {
  sequelize = new Sequelize(process.env.EXPENSE_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    }
  );
}

module.exports = sequelize;