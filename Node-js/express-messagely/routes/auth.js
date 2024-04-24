const User = require('../models/user')
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async (req,res,next) =>{
    try{
        const { username, password } = req.body;

        // auth user
        const user = await User.authenticate(username, password)

        if(user){
            const token = jwt.sign({ username }, SECRET_KEY);
            User.updateLoginTimestamp(username)
            return res.send( {token} )
        }

        // throw error if user returned false
        throw new ExpressError("Invalid username/password", 400);

    } catch(e){
        return next(e)
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req,res,next) => {
    try{
        const { username } = req.body;
        // register user
        const user = await User.register(req.body)
        if(user){
            const token = jwt.sign({ username }, SECRET_KEY);
            User.updateLoginTimestamp(username)
            return res.send( {token} )
        }

        // throw error if user returned false
        throw new ExpressError("username taken", 400);

    } catch(e){
        return next(e)
    }
})

module.exports = router;