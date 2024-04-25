process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");
const jsonschema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json")

const testBook = {
    "isbn": "1",
    "amazon_url": "Test",
    "author": "Test",
    "language": "Test",
    "pages": 1,
    "publisher": "Test",
    "title": "Test",
    "year": 2020
}

const bookMissingYearKey = {
    "isbn": "1",
    "amazon_url": "Test",
    "author": "Test",
    "language": "Test",
    "pages": 1,
    "publisher": "Test",
    "title": "Test"
}

const dbBook = {
    "isbn": "2",
    "amazon_url": "Test",
    "author": "Test",
    "language": "Test",
    "pages": 1,
    "publisher": "Test",
    "title": "Test",
    "year": 2020
}

const putTestBook = {
    "isbn": "2",
    "amazon_url": "Test",
    "author": "Different Author",
    "language": "Test",
    "pages": 1,
    "publisher": "Test",
    "title": "Test",
    "year": 2020
}


describe("Books Routes Test", function () {

    beforeEach(async function () {
        await db.query("DELETE FROM books");
        // add book to db for use in put route
        await Book.create(dbBook)
    });

    describe("POST /books", () => {

        test("Creating a book", async () => {
        const res = await request(app).post("/books").send(testBook);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({book: testBook});
        })

        test("Responds with 400 if no data is passed in", async () => {
        const res = await request(app).post("/books").send({});
        expect(res.statusCode).toBe(400);
        })

        test("Responds with 400 if missing single key", async () => {
            const res = await request(app).post("/books").send(bookMissingYearKey);
            expect(res.statusCode).toBe(400);
        })
    })

    describe("PUT /books/:isbn", () => {

        test("Editing a book", async () => {
        const res = await request(app).put("/books/2").send(putTestBook);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({book: putTestBook});
        })

        test("Responds with 400 if no data is passed in", async () => {
        const res = await request(app).put("/books/2").send({});
        expect(res.statusCode).toBe(400);
        })

        test("Responds with 400 if missing single key", async () => {
            const res = await request(app).put("/books/2").send(bookMissingYearKey);
            expect(res.statusCode).toBe(400);
        })
    })    

    afterAll(async function () {
        await db.end();
    });
});