/** User class for message.ly */
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../db");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");



/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register(postRequest) {
    const hashedPassword = await bcrypt.hash(postRequest.password, BCRYPT_WORK_FACTOR)
    const today = new Date()

    const results = await db.query(
      `INSERT INTO users
       (username, password, first_name, last_name, phone, join_at, last_login_at)
       VALUES($1, $2, $3, $4, $5, $6, $7)
       RETURNING username, password, first_name, last_name, phone`,
      [postRequest.username, hashedPassword, postRequest.first_name, postRequest.last_name, postRequest.phone, today, today])
      return results.rows[0]
   }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    const results = await db.query(`
      SELECT username, password
      FROM users
      WHERE username = $1`,
      [username]);
    
    const user = results.rows[0]

    if(user){
      if(await bcrypt.compare(password, user.password)) {
        return true
      }
    } return false
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const today = new Date()
    const results = await db.query(`
      UPDATE users SET last_login_at=$1
      WHERE username = $2`,
      [today, username])
   }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    let results = await db.query("SELECT username, first_name, last_name, phone FROM users")
    return results.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    let results = await db.query(`
    SELECT username, first_name, last_name, phone, join_at, last_login_at
    FROM users
    WHERE username = $1`, [username])

    const user = results.rows[0]

    if(user === undefined){
      const err = new Error(`No such user: ${username}`);
      err.status = 404;
      throw err;
    }

    return user
   }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    let results = await db.query(`
    SELECT m.id, m.body, m.sent_at, m.read_at,
    u.username, u.first_name, u.last_name, u.phone
    FROM messages AS m
      JOIN users AS u ON m.to_username = u.username
    WHERE m.from_username = $1`,
    [username])
    
    let messages = []

    // loop over every row to return all messages
    for(let m of results.rows){
      let res = {
        id: m.id,
        body: m.body,
        sent_at: m.sent_at,
        read_at: m.read_at,
        to_user: {
          first_name: m.first_name,
          last_name: m.last_name,
          phone: m.phone,
          username: m.username}}

      messages.push(res)
    }
    return messages
   }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    let results = await db.query(`
    SELECT m.id, m.body, m.sent_at, m.read_at, u.first_name, u.last_name, u.phone, u.username
    FROM messages AS m
      JOIN users AS u ON m.from_username = u.username
    WHERE m.to_username = $1`,
    [username])
    
    let messages = []

    // loop over every row to return all messages
    for(let m of results.rows){
      let res = {
        id: m.id,
        body: m.body,
        sent_at: m.sent_at,
        read_at: m.read_at,
        from_user: {
          first_name: m.first_name,
          last_name: m.last_name,
          phone: m.phone,
          username: m.username
        }
      }
      messages.push(res)
    }
    return messages
   }
}

module.exports = User;