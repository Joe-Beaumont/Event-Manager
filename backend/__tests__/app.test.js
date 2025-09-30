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
    test("404: if event does not exist", () => {
        return request(app)
        .get("/api/events/999")
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe("No events with that id");
        });
    });
    test("400: invalid event_id", () => {
        return request(app)
        .get("/api/events/abc")
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe("Invalid event_id")
        });
    });
});

describe("POST /api/events", () => {
    test("201: posts new event", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "Test_Event",
            date: "2025-09-30",
            time: "12:00",
            created_by : 1
        })
        .expect(201)
        .then(({ body }) => {
            const { event } = body
            expect(event.event_id).toBe(11);
            expect(event.name).toBe('Test_Event');
            expect(event.description).toBe('Test_Event');
            expect(event.date).toBe('2025-09-30');
            expect(event.time).toBe('12:00:00');
            expect(event.created_by).toBe(1);
        });
    });
    test("400: if user doesn't exist", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "Test_Event",
            date: "2025-09-30",
            time: "12:00",
            created_by: 999
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Invalid User")
        });
    });
    test("400: if missing required name", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "",
            description: "Test_Event",
            date: "2025-09-30",
            time: "12:00",
            created_by: 2
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Missing required field(s)")
        });
    });
    test("400: if missing required description", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "",
            date: "2025-09-30",
            time: "12:00",
            created_by: 2
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Missing required field(s)")
        });
    });
    test("400: if missing required date", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "Test_Event",
            date: "",
            time: "12:00",
            created_by: 2
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Missing required field(s)")
        });
    });
    test("400: if missing required time", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "Test_Event",
            date: "2025-09-30",
            time: "",
            created_by: 2
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Missing required field(s)")
        });
    });
    test("400: if invalid date", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "Test_Event",
            date: "not-a-date",
            time: "12:00",
            created_by: 2
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Invalid date")
        });
    });
    test("400: if invalid time", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "Test_Event",
            date: "2025-09-30",
            time: "not-a-time",
            created_by: 2
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Invalid time")
        });
    });
    test("400: invalid role", () => {
        return request(app)
        .post("/api/events")
        .send({
            name: "Test_Event",
            description: "Test_Event",
            date: "2025-09-30",
            time: "12:00",
            created_by: 3
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Only staff can create events")
        });
    });
});


describe("GET /api/users/:user_id", () => {
    test("200: responds with an object for a specific user", () => {
        return request(app)
        .get("/api/users/3")
        .expect(200)
        .then(({ body }) => {
            const { user } = body
            expect(user.user_id).toBe(3);
            expect(user.email).toBe('charlie@example.com');
            expect(user.password).toBe('$2b$10$Ljw9q9sFf0A8RkQ7YwF8Ru7aG0W9P3pE7uS5rFfLq0Cz1O');
            expect(user.role).toBe('member');
        });
    });
    test("404: if user does not exist", () => {
        return request(app)
        .get("/api/users/999")
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe("Invalid User");
        });
    });
    test("400: if user_id is invalid", () => {
        return request(app)
        .get("/api/users/not-an-id")
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe("Invalid User");
        });
    });
});

describe("POST /users", () => {
    test("201: posts new user", () => {
        return request(app)
        .post("/api/users")
        .send({
            email: "test@email.com",
            password: "test_password",
            role: "staff"
        })
        .expect(201)
        .then(({ body }) => {
            const { user } = body
            expect(user.user_id).toBe(11);
            expect(user.email).toBe('test@email.com');
            expect(user.password).toBe('test_password');
            expect(user.role).toBe('staff');
        });
    });
    test("400: when email is missing", () => {
        return request(app)
        .post("/api/users")
        .send({
            email: "",
            password: "test_password",
            role: "staff"
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Missing required field(s)")
        });
    });
    test("400: when password is missing", () => {
        return request(app)
        .post("/api/users")
        .send({
            email: "test@email.com",
            password: "",
            role: "staff"
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Missing required field(s)")
        });
    });
    test("400: when role is missing", () => {
        return request(app)
        .post("/api/users")
        .send({
            email: "test@email.com",
            password: "test_password",
            role: ""
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Missing required field(s)")
        });
    });
    test("400: when role is invalid", () => {
        return request(app)
        .post("/api/users")
        .send({
            email: "test@email.com",
            password: "test_password",
            role: "not-a-role"
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Role must either be staff or member")
        });
    });
    test("400: when email is duplicated", () => {
        return request(app)
        .post("/api/users")
        .send({
            email: "alice.staff@example.com",
            password: "test_password",
            role: "staff"
        })
        .expect(400)
        .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Email already exists")
        });
    });
});