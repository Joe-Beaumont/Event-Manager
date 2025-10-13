const request = require("supertest");
const db = require("../db/connection.js");
const app = require("../server.js");
const data = require("../db/data/test_data");
const seed = require("../db/seeds/seed.js");
require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

//api/events

describe("GET /api/events", () => {
    test("200: responds with an array of events, sorted by date", () => {
        return request(app)
            .get("/api/events")
            .expect(200)
            .then(({ body }) => {
                const { events } = body
                expect(Array.isArray(events)).toBe(true);
                expect(events.length).toBe(20);
                expect(events).toBeSortedBy('start_time', { descending: false })
                events.forEach((event) => {
                    expect(event).toHaveProperty('event_id');
                    expect(event).toHaveProperty('name');
                    expect(event).toHaveProperty('description');
                    expect(event).toHaveProperty('start_time');
                    expect(event).toHaveProperty('end_time');
                    expect(event).toHaveProperty('created_by');
                    expect(event).toHaveProperty('google_event_id');
                    expect(event).toHaveProperty('image_url');
                });
            });
    });
});

describe("POST /api/events", () => {
    test("201: posts new event", () => {
        return request(app)
            .post("/api/events")
            .send({
                name: "Test Event",
                description: "Test Event",
                start_time: "2025-11-12T10:00:00",
                end_time: "2025-11-12T16:00:00",
                created_by: 1,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
            })
            .expect(201)
            .then(({ body }) => {
                const { event } = body
                expect(event.event_id).toBe(21);
                expect(event.name).toBe('Test Event');
                expect(event.description).toBe('Test Event');
                expect(event.start_time).toBe('2025-11-12T10:00:00.000Z');
                expect(event.end_time).toBe('2025-11-12T16:00:00.000Z');
                expect(event.created_by).toBe(1);
                expect(event.google_event_id).toBe(null);
                expect(event.image_url).toBe("https://picsum.photos/seed/ev2/600/400");
            });
    });
    test("400: if user doesn't exist", () => {
        return request(app)
            .post("/api/events")
            .send({
                name: "Test Event",
                description: "Test Event",
                start_time: "2025-11-12T10:00:00",
                end_time: "2025-11-12T16:00:00",
                created_by: 999,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
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
                description: "Test Event",
                start_time: "2025-11-12T10:00:00",
                end_time: "2025-11-12T16:00:00",
                created_by: 1,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
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
                name: "Test Event",
                description: "",
                start_time: "2025-11-12T10:00:00",
                end_time: "2025-11-12T16:00:00",
                created_by: 1,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Missing required field(s)")
            });
    });
    test("400: if missing required start_time", () => {
        return request(app)
            .post("/api/events")
            .send({
                name: "Test Event",
                description: "Test Event",
                start_time: "",
                end_time: "2025-11-12T16:00:00",
                created_by: 1,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Missing required field(s)")
            });
    });
    test("400: if missing required end_time", () => {
        return request(app)
            .post("/api/events")
            .send({
                name: "Test Event",
                description: "Test Event",
                start_time: "2025-11-12T10:00:00",
                end_time: "",
                created_by: 1,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Missing required field(s)")
            });
    });
    test("400: if invalid start_time", () => {
        return request(app)
            .post("/api/events")
            .send({
                name: "Test Event",
                description: "Test Event",
                start_time: "not-a-timestamp",
                end_time: "2025-11-12T16:00:00",
                created_by: 1,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Invalid start time")
            });
    });
    test("400: if invalid end_time", () => {
        return request(app)
            .post("/api/events")
            .send({
                name: "Test Event",
                description: "Test Event",
                start_time: "2025-11-12T10:00:00",
                end_time: "not-an-timestamp",
                created_by: 1,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Invalid end time")
            });
    });
    test("400: invalid role", () => {
        return request(app)
            .post("/api/events")
            .send({
                name: "Test Event",
                description: "Test Event",
                start_time: "2025-11-12T10:00:00",
                end_time: "2025-11-12T16:00:00",
                created_by: 3,
                google_event_id: null,
                image_url: "https://picsum.photos/seed/ev2/600/400"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Only staff can create events")
            });
    });
});

//api/events/:event_id

describe("GET /api/events/:event_id", () => {
    test("200: responds with an object for a specific event", () => {
        return request(app)
            .get("/api/events/3")
            .expect(200)
            .then(({ body }) => {
                const { event } = body
                expect(event.event_id).toBe(3);
                expect(event.name).toBe('Cloud Computing Workshop');
                expect(event.description).toBe('Learn AWS, Azure, and GCP basics.');
                expect(event.start_time).toBe('2025-11-15T13:00:00.000Z');
                expect(event.end_time).toBe('2025-11-15T18:00:00.000Z');
                expect(event.created_by).toBe(2);
                expect(event.google_event_id).toBe(null);
                expect(event.image_url).toBe('https://picsum.photos/seed/ev3/600/400');
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
    test("404: if event does not exist", () => {
        return request(app)
            .get("/api/events/999")
            .expect(404)
            .then(({ body }) => {
                const { msg } = body
                expect(msg).toBe("No events with that id");
            });
    });
});

describe("PATCH /api/events/:event_id", () => {
    test("201: updates event start_time successfully", () => {
        return request(app)
            .patch("/api/events/3")
            .send({ start_time: "2025-11-15T09:00:00" })
            .expect(201)
            .then(({ body }) => {
                const { event } = body;
                expect(event.start_time).toBe("2025-11-15T09:00:00.000Z");
            });
    });
    test("201: updates event end_time successfully", () => {
        return request(app)
            .patch("/api/events/3")
            .send({ end_time: "2025-11-15T18:00:00" })
            .expect(201)
            .then(({ body }) => {
                const { event } = body;
                expect(event.end_time).toBe("2025-11-15T18:00:00.000Z");
            });
    });
    test("201: updates event name successfully", () => {
        return request(app)
            .patch("/api/events/3")
            .send({ name: "Updated_Event_Name" })
            .expect(201)
            .then(({ body }) => {
                expect(body.event.name).toBe("Updated_Event_Name");
            });
    });
    test("201: updates event description successfully", () => {
        return request(app)
            .patch("/api/events/3")
            .send({ description: "Updated event description" })
            .expect(201)
            .then(({ body }) => {
                expect(body.event.description).toBe("Updated event description");
            });
    });
    test("400: invalid start_time format", () => {
        return request(app)
            .patch("/api/events/3")
            .send({ start_time: "not-a-timestamp" })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid start_time");
            });
    });
    test("400: invalid end_time format", () => {
        return request(app)
            .patch("/api/events/3")
            .send({ end_time: "not-a-timestamp" })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid end_time");
            });
    });
    test("404: event does not exist", () => {
        return request(app)
            .patch("/api/events/999")
            .send({ name: "Nonexistent Event" })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("No events with that id");
            });
    });
});

describe("DELETE /api/events/:event_id", () => {
    test("deletes given event by event_id", () => {
        return request(app)
            .delete("/api/events/4")
            .expect(204)
    });
    test("returns 404 if event_id valid but doesn't exist", () => {
        return request(app)
            .delete("/api/events/999")
            .expect(404)
            .then(({ body }) => {
                const { msg } = body
                expect(msg).toBe("No events with that id")
            });
    });
    test("returns 400 if event_id not valid", () => {
        return request(app)
            .delete("/api/events/notAnID")
            .expect(400)
            .then(({ body }) => {
                const { msg } = body
                expect(msg).toBe("Invalid event_id")
            });
    });
});

//api/users

describe("POST /users", () => {
    test("201: posts new user", () => {
        return request(app)
            .post("/api/users")
            .send({
                email: "test@email.com",
                password: "Password123",
                role: "staff"
            })
            .expect(201)
            .then(({ body }) => {
                const { user } = body
                expect(user.user_id).toBe(11);
                expect(user.email).toBe('test@email.com');
                expect(user.password).toBe('Password123');
                expect(user.role).toBe('staff');
            });
    });
    test("400: when email is missing", () => {
        return request(app)
            .post("/api/users")
            .send({
                email: "",
                password: "Password123",
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
                password: "Password123",
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
                password: "Password123",
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
                password: "Password123",
                role: "staff"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Email already exists")
            });
    });
});

// Login

describe("POST /api/users/login", () => {
    test("200: responds with a user object when valid credentials are provided", () => {
        return request(app)
            .post("/api/users/login")
            .send({ email: "alice.staff@example.com", password: "password123" })
            .expect(200)
            .then(({ body }) => {
                expect(body.user).toBeInstanceOf(Object);
                expect(body.user).toHaveProperty("email", "alice.staff@example.com");
                expect(body.user).toHaveProperty("role");
            });
    });

    test("404: responds with 'User not found' when the email does not exist", () => {
        return request(app)
            .post("/api/users/login")
            .send({ email: "missing@example.com", password: "password123" })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User not found");
            });
    });

    test("401: responds with 'Invalid credentials' when the password is incorrect", () => {
        return request(app)
            .post("/api/users/login")
            .send({ email: "alice.staff@example.com", password: "wrongpassword" })
            .expect(401)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid credentials");
            });
    });

    test("400: responds with a custom error if email or password is missing", () => {
        return request(app)
            .post("/api/users/login")
            .send({ email: "alice.staff@example.com" })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Email and password required");
            });
    });
});

//api/users/:user_id

describe("GET /api/users/:user_id", () => {
    test("200: responds with an object for a specific user", () => {
        return request(app)
            .get("/api/users/3")
            .expect(200)
            .then(({ body }) => {
                const { user } = body
                expect(user.user_id).toBe(3);
                expect(user.email).toBe('charlie@example.com');
                expect(user.password).toBe('password123');
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

//api/users/:user_id/events
describe("GET /users/:user_id/events", () => {
    test("200: responds with an array of events being attended by user", () => {
        return request(app)
            .get("/api/users/4/events")
            .expect(200)
            .then(({ body }) => {
                const { events } = body
                expect(Array.isArray(events)).toBe(true);
                expect(events.length).toBe(2);
                expect(events).toBeSortedBy('start_time', { descending: false })
                expect(events[0].event_id).toBe(1);
                expect(events[1].event_id).toBe(8);
                events.forEach((event) => {
                    expect(event).toHaveProperty('event_id');
                    expect(event).toHaveProperty('name');
                    expect(event).toHaveProperty('description');
                    expect(event).toHaveProperty('start_time');
                    expect(event).toHaveProperty('end_time');
                    expect(event).toHaveProperty('created_by');
                    expect(event).toHaveProperty('google_event_id');
                    expect(event).toHaveProperty('image_url');
                });
            });
    });
    test("404: if user doesn't exist", () => {
        return request(app)
            .get("/api/users/999/events")
            .expect(404)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("No Events Found")
            });
    });
    test("404: if user doesn't have any events", () => {
        return request(app)
            .get("/api/users/1/events")
            .expect(404)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("No Events Found")
            });
    });
    test("400: if user_id is invalid", () => {
        return request(app)
            .get("/api/users/not-an-id/events")
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Invalid User")
            });
    });
})

//api/events/:id/attend
describe("POST /events/:event_id/attend", () => {
    test("201: marks user as attending event", () => {
        return request(app)
            .post("/api/events/2/attend")
            .send({
                user_id: 4
            })
            .expect(201)
            .then(({ body }) => {
                const { attending } = body
                expect(attending.attending_id).toBe(11);
                expect(attending.event_id).toBe(2);
                expect(attending.user_id).toBe(4);
            });
    });
    test("400: if user doesn't exist", () => {
        return request(app)
            .post("/api/events/2/attend")
            .send({
                user_id: 999
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Invalid User")
            });
    });
    test("400: if event is invalid", () => {
        return request(app)
            .post("/api/events/not-an-id/attend")
            .send({
                user_id: 4
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Invalid event_id")
            });
    });
    test("400: if user is invalid", () => {
        return request(app)
            .post("/api/events/2/attend")
            .send({
                user_id: "not-an-id"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("Invalid user_id")
            });
    });
    test("404: if event doesn't exist", () => {
        return request(app)
            .post("/api/events/999/attend")
            .send({
                user_id: 4
            })
            .expect(404)
            .then(({ body }) => {
                const { msg } = body;
                expect(msg).toBe("No events with that id")
            });
    });
});

describe("DELETE /events/:event_id/attend", () => {
    test("deletes attendance record", () => {
        return request(app)
            .delete("/api/events/4/attend")
            .send({
                user_id: 4
            })
            .expect(204)
    });
    test("returns 400 if event_id not valid", () => {
        return request(app)
            .delete("/api/events/not-an-id/attend")
            .send({
                user_id: 4
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body
                expect(msg).toBe("Invalid event_id")
            });
    });
    test("returns 400 if event_id not valid", () => {
        return request(app)
            .delete("/api/events/4/attend")
            .send({
                user_id: "not-an-id"
            })
            .expect(400)
            .then(({ body }) => {
                const { msg } = body
                expect(msg).toBe("Invalid user_id")
            });
    });
    test("returns 404 if event_id valid but doesn't exist", () => {
        return request(app)
            .delete("/api/events/999/attend")
            .send({
                user_id: 4
            })
            .expect(404)
            .then(({ body }) => {
                const { msg } = body
                expect(msg).toBe("No events with that id")
            });
    });
});

//api/events/:event_id/attendees

describe("GET /events/:event_id/attend/users", () => {
    test("200: responds with an array of users", () => {
        return request(app)
            .get("/api/events/4/attend/users")
            .expect(200)
            .then(({ body }) => {
                const { attending } = body
                expect(Array.isArray(attending)).toBe(true);
                expect(attending.length).toBe(1);
                attending.forEach((attendance) => {
                    expect(attendance.email).toBe('helen@example.com');
                    expect(attendance.password).toBe('password123');
                    expect(attendance.role).toBe('member');
                    expect(attendance.user_id).toBe(8);
                });
            });
    });
    test("400: responds with 'Invalid event_id' when event_id is not a number", () => {
        return request(app)
            .get("/api/events/not-a-number/attend/users")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Invalid event_id");
            });
    });
    test("404: responds with 'No users attending this event' when event_id does not exist", () => {
        return request(app)
            .get("/api/events/999/attend/users")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("No events with that id");
            });
    });
});

//api/events/:event_id/attending/:user_id

describe("GET /events/:event_id/attend/users/:user_id", () => {
  test("200: responds with { registered: true } when the user is attending", () => {
    return request(app)
      .get("/api/events/4/attend/users/8")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("registered");
        expect(typeof body.registered).toBe("boolean");
        expect(body.registered).toBe(true);
      });
  });
  test("200: responds with { registered: false } when the user is not attending", () => {
    return request(app)
      .get("/api/events/4/attend/users/999")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("registered");
        expect(typeof body.registered).toBe("boolean");
        expect(body.registered).toBe(false);
      });
  });
  test("400: responds with an error if event_id is invalid", () => {
    return request(app)
      .get("/api/events/notAnId/attend/users/8")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid event_id");
      });
  });
    test("400: responds with an error if user_id is invalid", () => {
    return request(app)
      .get("/api/events/4/attend/users/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid user_id");
      });
  });
});
