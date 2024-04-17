/** Database setup for BizTime. */
const { Client } = require('pg');

// db only connects with correct password
// added password file to .gitignore
const myPassword = require('./myPassword')

let DB_URI;

if (process.env.NODE_ENV === 'test'){
    DB_URI = "biztime_test"
} else{
    DB_URI = "biztime"
}

let db = new Client({
    host: 'localhost',
    database: DB_URI,
    password: myPassword
})

db.connect()

module.exports = db;