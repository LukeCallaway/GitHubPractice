const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");
const slugify = require('slugify')

router.get('/', async (req,res,next) =>{
    try {
        const results = await db.query(`SELECT * FROM industries`);
        return res.json({ industries: results.rows })
    } catch (e) {
        return next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { industry } = req.body;
        const code = slugify(industry, {replacement: '_', lower:true, strict:true})
        const results = await db.query('INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING *', [code, industry]);
        return res.status(201).json({ industry: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.post('/:code', async (req, res, next) => {
    try {
        const { comp_code } = req.body;
        const industry_code = req.params.code; 
        const results = await db.query('INSERT INTO companies_industries (comp_code, industry_code) VALUES ($1, $2) RETURNING *', [comp_code, industry_code]);
        return res.status(201).json({ company_industry: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;