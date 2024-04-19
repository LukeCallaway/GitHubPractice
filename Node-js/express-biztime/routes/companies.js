const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");
const slugify = require('slugify')

router.get('/', async (req,res,next) =>{
    try {
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({ companies: results.rows })
    } catch (e) {
        return next(e);
    }
})

router.get('/:code', async (req, res, next) => {
    try {
      const { code } = req.params;
      const results = await db.query('SELECT * FROM companies WHERE code = $1', [code])
      const invoiceResults = await db.query('SELECT * FROM invoices WHERE comp_code = $1', [code])
      const industriesResults = await db.query('SELECT * FROM companies_industries WHERE comp_code = $1', [code])
      if (results.rows.length === 0) {
        throw new ExpressError(`Can't find company with code of ${code}`, 404)
      }
      return res.json({ company: results.rows[0], invoices: invoiceResults.rows[0], industries: industriesResults.rows[0] })
    } catch (e) {
      return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const code = slugify(name, {replacement: '_', lower:true, strict:true})
        const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *', [code, name, description]);
        return res.status(201).json({ company: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.put('/:code', async (req, res, next) => {
    try {
      const { code } = req.params;
      const { name, description } = req.body;
      const results = await db.query(`UPDATE companies SET name=$1, description=$2, code=$3 WHERE code=$4 RETURNING *`, [name, description, code, code])
      if (results.rows.length === 0) {
        throw new ExpressError(`Can't update company with name of ${name}`, 404)
      }
      return res.json({ company: results.rows[0] })
    } catch (e) {
      return next(e)
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
      const results = db.query('DELETE FROM companies WHERE code = $1', [req.params.code])
      return res.send({ status: "DELETED!" })
    } catch (e) {
      return next(e)
    }
  })
  
module.exports = router;