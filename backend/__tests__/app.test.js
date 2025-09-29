const request = require("supertest");
const db = require("../db/connection.js");
const app = require("../server.js");
const data = require("../db/data/test_data");
const seed = require("../db/seeds/seed.js");
require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/events", () => {
    test("200: responds with an array of events", () => {
        return request(app)
        .get("/api/events")
        .expect(200)
        .then(({ body }) => {
            const { events } = body
            expect(Array.isArray(events)).toBe(true);
            expect(events.length).toBe(10);
            events.forEach((event) => {
                expect(event).toHaveProperty('event_id');
                expect(event).toHaveProperty('name');
                expect(event).toHaveProperty('description');
                expect(event).toHaveProperty('date');
                expect(event).toHaveProperty('time');
                expect(event).toHaveProperty('created_by');
            });
        });
    });
});

describe("GET /api/events/:event_id", () => {
    test("200: responds with an object for a specific event", () => {
        return request(app)
        .get("/api/events/3")
        .expect(200)
        .then(({ body }) => {
            const { event } = body
            expect(event.event_id).toBe(3);
            expect(event.name).toBe('Cloud Computing Bootcamp');
            expect(event.description).toBe('Hands-on AWS, Azure, GCP labs');
            expect(event.date).toBe('2025-06-07');
            expect(event.time).toBe('11:00:00');
            expect(event.created_by).toBe(1);
        });
    });
});