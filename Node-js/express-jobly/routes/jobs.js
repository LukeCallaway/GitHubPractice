const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureIsAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const companyNewSchema = require("../schemas/companyNew.json");
const companyUpdateSchema = require("../schemas/companyUpdate.json");

const router = new express.Router();

router.post('/', ensureIsAdmin, async function (req, res, next){
    try {
        const job = await Job.create(req.body)
        return res.status(201).json({ job })
    } catch(e){
        return next(e)
    }
})

router.get('/', async function (req, res, next){

    try {
        const jobs = await Job.findAll(req.query)
        return res.json({ jobs })
    } catch(e){
        return next(e)
    }
})

router.get("/:id", async function (req, res, next) {
    try {
      const job = await Job.findOne(req.params.id);
      return res.json({ job });
    } catch (e) {
      return next(e);
    }
  });

  router.patch("/:id", ensureIsAdmin, async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, companyUpdateSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const job = await Job.update(req.params.id, req.body);
      return res.json({ job });
    } catch (e) {
      return next(e);
    }
  });
  
  router.delete("/:id", ensureIsAdmin, async function (req, res, next) {
    try {
      await Job.remove(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (e) {
      return next(e);
    }
  });

module.exports = router;