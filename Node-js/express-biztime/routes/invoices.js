const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req,res,next) =>{
    try {
        const results = await db.query(`SELECT * FROM invoices`);
        return res.json({ invoices: results.rows })
    } catch (e) {
        return next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const results = await db.query('SELECT * FROM invoices WHERE id = $1', [id])
      const companyResult = await db.query('SELECT * FROM companies WHERE code = $1', [results.rows[0].comp_code])
      if (results.rows.length === 0) {
        throw new ExpressError(`Can't find invoice with id of ${id}`, 404)
      }
      return res.json({ invoice: results.rows[0],  company: companyResult.rows[0] })
    } catch (e) {
      return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { comp_code, amt, paid, add_date, paid_date } = req.body;
        const results = await db.query('INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [comp_code, amt, paid, add_date, paid_date]);
        return res.status(201).json({ invoice: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const {amt, paid} = req.body;
      let paidDate = new Date();
      if(paid === 'f'){
        paidDate = null;
      }
      const results = await db.query(`UPDATE invoices SET amt=$1, paid=$2, paid_date= $4 WHERE id=$3 RETURNING *`, [amt, paid, id, paidDate])
      if (results.rows.length === 0) {
        throw new ExpressError(`Can't update invoice with id of ${id}`, 404)
      }
      return res.send({ invoice: results.rows[0] })
    } catch (e) {
      return next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
      const results = db.query('DELETE FROM invoices WHERE id = $1', [req.params.id])
      return res.send({ status: "DELETED!" })
    } catch (e) {
      return next(e)
    }
  })
  

module.exports = router;