/** Database connection for messagely. */


const { Client } = require("pg");
const { DB_URI, myPassword } = require("./config");
// const { password } = require("pg/lib/defaults");

const client = new Client({
    database: DB_URI,
    password: myPassword});

client.connect();


module.exports = client;
