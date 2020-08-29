const { Sequelize } = require('sequelize');

module.exports = new Sequelize('epam-node', 
'postgres', 
'12345', {
    host: 'localhost',
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