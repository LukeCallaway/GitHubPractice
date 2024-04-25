/** Database config for database. */


const { Client } = require("pg");
const {DB_URI} = require("./config");
const { password } = require("pg/lib/defaults");

let db = new Client({
  database: 'books_test'
});

db.connect();


module.exports = db;
