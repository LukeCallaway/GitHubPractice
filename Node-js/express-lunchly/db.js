// /** Database for lunchly */

const { Client } = require('pg');

let DB_URI;

// if (process.env.NODE_ENV === 'test'){
//     DB_URI = "lunchly_test"
// } else{
//     DB_URI = "lunchly"
// }

let db = new Client({
    host: 'localhost',
    database: 'lunchly',
    password: 'addPasswordHere'
})

db.connect()

module.exports = db;