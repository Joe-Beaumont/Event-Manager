const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/connection");
const { handle404, handlePostgresErrors, handleCustomErrors, handleServerErrors } = require("./controllers/error.controller");
const { getEvents, getEvent, postEvent, patchEvent, cancelEvent } = require("./controllers/event.controller");
const { getUser, postUser } = require("./controllers/user.controller");

app.use(cors());
app.use(express.json());

// routers
// User endpoints

// POST /users
app.post("/api/users", postUser);
// GET /users/:id
app.get("/api/users/:user_id", getUser);

// Event endpoints
// POST /events
app.post("/api/events", postEvent);
// GET /events
app.get("/api/events", getEvents);
// GET /events/:id
app.get("/api/events/:event_id", getEvent);
// PATCH /events/:id
app.patch("/api/events/:event_id", patchEvent);
// DELETE /events/:id
app.delete("/api/events/:event_id", cancelEvent);

// Attending endpoints
// POST /events/:id/attend
// DELETE /events/:id/attend
// GET /events/:id/attendees

// Error Handling middleware
app.all(/.*/, handle404);

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;