const express = require("express");
const router = express.Router();
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth')
const Message = require('../models/user')


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async (req,res,next) => {
    try{
        const { id } = req.params;
        results = await Message.get(id)
        return res.json({message: results})
    } catch(e){
        return next(e)
    }
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async (req,res,next) => {
    try{
        const { id } = req.params;
        const { from_username, to_username, body, sent_at } = req.body;
        results = await Message.create(from_username, to_username, body, sent_at)
        return res.json({message: results})
    } catch(e){
        return next(e)
    }
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', authenticateJWT, ensureLoggedIn, ensureCorrectUser, async (req,res,next) => {
    try{
        const { id } = req.params;
        const { read_at } = req.body;
        results = await Message.markRead(id, read_at)
        return res.json({message: results})
    } catch(e){
        return next(e)
    }
})

module.exports = router;