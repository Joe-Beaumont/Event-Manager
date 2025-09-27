const db = require("../db/connection.js");
const app = require("../server.js");
const data = require("../db/data/test_data")

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("", () => {
    test("", () => {

    })
});