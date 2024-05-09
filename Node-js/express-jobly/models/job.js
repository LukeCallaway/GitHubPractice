const db = require('../db');
const {BadRequestError, NotFoundError, ExpressError} = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Job {

    static async create({title, salary, equity, company_handle}){

        // make sure company exitsts before creation of job
        const companyCheck = await db.query(
            `SELECT handle 
            FROM companies
            WHERE handle = $1
            LIMIT 1`,
            [company_handle]
        );

        if(!companyCheck.rows[0]){
            throw new BadRequestError(`${company_handle} not found`)
        };

        const result = await db.query(
            `INSERT INTO jobs
            (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING title, salary, equity, company_handle`,
            [title, salary, equity, company_handle]
        )
        const newJob = result.rows[0];

        return newJob;
    }

    static async findAll(searchFilters = {}){
        let query =
            `SELECT title, salary, equity, company_handle
            FROM jobs`

        const {title, minSalary, hasEquity} = searchFilters;
        let whereClauses = []
        let whereValues = []
  
        // add each query param to db query
        if (title){
            whereValues.push(`%${title}%`)
            whereClauses.push(`title ILIKE $${whereValues.length}`)
        }

        if(minSalary){
            whereValues.push(minSalary)
            whereClauses.push(`salary >= $${whereValues.length}`)
        }

        if(hasEquity === 't' || hasEquity === 'true'){
            whereValues.push(0)
            whereClauses.push(`equity > $${whereValues.length}`)
        }

        // only add WHERE statment if filters are passed in
        if(whereValues.length > 0){
            query += ` WHERE ` + whereClauses.join(` AND `)
        }

        query += ` ORDER BY title`

        const jobRes = await db.query(query, whereValues)
        return jobRes.rows;
    }

    static async findOne(id){
        const results = await db.query(
            `SELECT title, salary, equity, company_handle
            FROM jobs 
            WHERE id = $1`,
            [id]
        )

        if(!results.rows){
            throw new BadRequestError(`job id doesn't exist`)
        }

        return results.rows;
    }

    static async update(id, data){
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
              id: id,
              company_handle: 'company_handle'
            });
        const handleVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE jobs 
                          SET ${setCols} 
                          WHERE id = ${handleVarIdx} 
                          RETURNING title, 
                          salary, 
                          equity, 
                          company_handle`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];
    
        if (!job) throw new NotFoundError(`No job: ${id}`);
    
        return job;        
    }

    static async remove(id){
        const result = db.query(
            `DELETE 
            FROM jobs
            WHERE id = $1
            RETURNING id`,
            [id]
        );

        const job = result.rows[0];

        if(!job) throw new ExpressError(`No job ${id}`);

        return job;
    }
}

module.exports = Job;