const User = require('../models/user')
const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth')
/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get('/', async (req, res, next) => {
    try{
        results = await User.all()
        return res.json(results)
    } catch (e) {
        return next(e)
    }
})

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get('/:username', async (req, res, next) => {
    try{
        const { username } = req.params;
        results = await User.get(username)
        return res.send({user: results})
    } catch (e) {
        return next(e)
    }
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get('/:username/to', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    try{
        const { username } = req.params;
        results = await User.messagesTo(username)
        return res.send({messages: results})
    } catch (e) {
        return next(e)
    }
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/from', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async (req, res, next) => {
    try{
        const { username } = req.params;
        results = await User.messagesFrom(username)
        return res.send({messages: results})
    } catch (e) {
        return next(e)
    }
})

module.exports = router;