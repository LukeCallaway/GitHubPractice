"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn, ensureIsAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureIsAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: login
 **/

router.get("/", ensureIsAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: login
 **/

router.get("/:username",  ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const username = req.params.username;
    const user = await User.get(username);
    const jobs = await User.getAppInfo(username);

    return res.json({ user:{
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        jobs: jobs
                      } 
                    }
                  );
                  
  } catch (err) {
    return next(err);
  }
});

router.post('/:username/jobs/:id', async function (req,res,next) {
  try{
    const {username, id} = req.params;
    const applictaion = User.applyForJob(username, id)

    if(res.locals.user.username === username || res.locals.user.isAdmin == true){
      throw new ExpressError('Must be admin or that user to access info', 401)
    }

    return res.status(201).json({applied: jobId});

  } catch(e){
    return next(e)
  }
})


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: login
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const username = req.params.username;

    const user = await User.update(username, req.body);

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: login
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const username = req.params.username;
        
    await User.remove(username);

    return res.json({ deleted: username });

  } catch (err) {
    return next(err);
  }
});


module.exports = router;