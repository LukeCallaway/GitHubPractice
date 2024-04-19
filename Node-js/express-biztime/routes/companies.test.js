// Tell Node that we're in test "mode"
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testCompany;
beforeEach(async () => {
  const newCompany = await db.query(`INSERT INTO companies (code, name, description) VALUES ('nvda', 'nvidia', 'tech comp') RETURNING  *`);
  testCompany = newCompany.rows[0]
  
  const newInvoice = await db.query(`INSERT INTO invoices (comp_code, amt, paid) VALUES ('nvda', '100', 'f') RETURNING  *`)
  testInvoice = newInvoice.rows[0]
})

afterEach(async () => {
    await db.query('DELETE FROM companies')
    await db.query(`DELETE FROM invoices`)
})

afterAll(async () => {
  await db.end()
})

describe("GET /companies", () => {
  test("Get a list with one company", async () => {
    const res = await request(app).get('/companies')
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ companies: [testCompany] })
  })
})

describe("GET /company/:code", () => {
  test("Gets a single company", async () => {
    const res = await request(app).get(`/companies/nvda`)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ company: testCompany, invoices: testInvoice })
  })
  test("Responds with 404 for invalid code", async () => {
    const res = await request(app).get(`/companies/0`)
    expect(res.statusCode).toBe(404);
  })
})

describe("POST /companies", () => {
  test("Creates a single company", async () => {
    const res = await request(app).post('/companies').send({name: 'Apple Computers', description: 'tech' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      company: {code: 'apple_computers', name: 'Apple Computers', description: 'tech' }
    })
  })
})

describe("PUT /companies/:code", () => {
  test("Updates a single company", async () => {
    const res = await request(app).put(`/companies/${testCompany.code}`).send({code: 'nvda', name: 'Nvidia', description: 'tech' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      company: {code: 'nvda', name: 'Nvidia', description: 'tech' }
    })
  })
  test("Responds with 404 for invalid code", async () => {
    const res = await request(app).patch(`/companies/0`).send({code: 'wrongCode', name: 'Nvidia', description: 'tech' });
    expect(res.statusCode).toBe(404);
  })
})

describe("DELETE /companies/:code", () => {
  test("Deletes a single company", async () => {
    const res = await request(app).delete(`/companies/${testCompany.code}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'DELETED!' })
  })
})

