const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
    host: process.env.HOST,
    dialect: 'postgres',
  });

  //Connection test
//   async function auth() {
//     try {
//         await db.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       } 
//   }
//   auth()