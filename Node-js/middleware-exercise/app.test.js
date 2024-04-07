process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");


beforeEach(() => {
  items.push({'id': '1', 'name': "cheese", 'price': '2.50' });
});

afterEach(() => {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual([{'id': '1', 'name': "cheese", 'price': '2.50' }])
    })
})

describe("GET /items/:id", () => {
    test("Get one item", async () => {
      const res = await request(app).get("/items/1");
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({'item': {'id': '1', 'name': "cheese", 'price': '2.50' }})
    })
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get(`/items/2`);
        expect(res.statusCode).toBe(404)
      })
})

describe("POST /items", () => {
    test("Creating an item", async () => {
      const res = await request(app).post("/items").send({'name': 'yogurt', 'price': '1.50'});
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({'item': {'id': '2', 'name': 'yogurt', 'price': '1.50'}});
    })
    test("Responds with 400 if name is missing", async () => {
      const res = await request(app).post("/items").send({});
      expect(res.statusCode).toBe(400);
    })
  })
  
// make patch and delete routes item based and not cat based
describe("/PATCH /items/:id", () => {
    test("Updating an item's name or price", async () => {
      const res = await request(app).patch(`/items/1`).send({ 'name': "juice" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({'updated item': {'id': '1', 'name': "juice", 'price': '2.50' }});
    })
    test("Responds with 404 for invalid name", async () => {
      // no item with id of 2
      const res = await request(app).patch(`/items/2`).send({ 'name': "milk" });
      expect(res.statusCode).toBe(404);
    })
  })
  
describe("/DELETE /items/:id", () => {
    test("Deleting an item", async () => {
      const res = await request(app).delete(`/items/1`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Item Deleted' })
    })
    // no item with id of 2
    test("Responds with 404 for deleting invalid item", async () => {
      const res = await request(app).delete(`/cats/2`);
      expect(res.statusCode).toBe(404);
    })
  })
  