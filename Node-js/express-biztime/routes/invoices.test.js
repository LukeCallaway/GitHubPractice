process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testInvoice;
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

// describe("GET /invoices", () => {
//   test("Get all invoices", async () => {
//     const res = await request(app).get('/invoices')
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({ invoices: [testInvoice] })
//   })
// })

// describe("GET /invoices/:id", () => {
//   test("Gets a single invoice", async () => {
//     const res = await request(app).get(`/invoices/${testInvoice.id}`)
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({  invoice: testInvoice, company: testCompany })
//   })
//   test("Responds with 404 for invalid code", async () => {
//     const res = await request(app).get(`/companies/0`)
//     expect(res.statusCode).toBe(404);
//   })
// })

// describe("POST /invoices", () => {
//   test("Creates a single invoice", async () => {
//     const res = await request(app).post('/invoices').send({comp_code: 'nvda', amt: '100', paid: 'f', add_date: '2024-04-18', paid_date: null });
//     expect(res.statusCode).toBe(201);
//     expect(res.body).toEqual({
//       invoice: {id: expect.any(Number), comp_code: 'nvda', amt: 100, paid: false, 'add_date': '2024-04-18T05:00:00.000Z', paid_date: null }
//     })
//   })
// })

describe("PUT /invoices/:id", () => {
  test("Updates a single invoice", async () => {
    const res = await request(app).put(`/invoices/${testInvoice.id}`).send({amt: '100', paid: 't'});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      invoice: {id: expect.any(Number), comp_code: 'nvda', amt: 100, paid: true, add_date: "2024-04-18T05:00:00.000Z", paid_date: "2024-04-18T05:00:00.000Z"}
    })
  })
//   test("Responds with 404 for invalid code", async () => {
//     const res = await request(app).patch(`/companies/0`).send({code: 'wrongCode', name: 'Nvidia', description: 'tech' });
//     expect(res.statusCode).toBe(404);
//   })
})

// describe("DELETE /invoices/:id", () => {
//   test("Deletes a single invoice", async () => {
//     const res = await request(app).delete(`/invoices/${testInvoice.id}`);
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({ status: 'DELETED!' })
//   })
// })
