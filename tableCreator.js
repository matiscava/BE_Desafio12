const { connectMySQL } = require('./options/mysql.js');
const knexMySQL = require('knex')(connectMySQL);

const { connectSqlite } = require('./options/sqlite3');
const knexSqlite = require('knex')(connectSqlite);



//Crea table en la BD MySQL

// knexMySQL.schema.createTable('products', table => {
//     table.increments('id');
//     table.string('title');
//     table.string('thumbnail');
//     table.string('description');
//     table.integer('price');
//     table.integer('stock');
//     table.string('timestamp');
// })
//     .then(() => console.log('table created'))
//     .catch((error) => {
//         console.error(`Error: ${error}`);
//         throw error;
//     })
//     .finally(() => knexMySQL.destroy());


//Crea table en la BD sqlite3

// knexSqlite.schema.createTable('chat', table => {
//     table.string('id');
//     table.string('user');
//     table.string('date');
//     table.string('message');
// })
//     .then(() => console.log('Table Created'))
//     .catch((error) => {
//         console.error(`Error: ${error}`);
//         throw error;
//     })
//     .finally(() => knexSqlite.destroy())

// knexSqlite.schema.dropTable('chat')

