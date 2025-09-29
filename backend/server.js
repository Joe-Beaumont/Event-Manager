const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/connection")
const { getEvents, getEvent } = require("./controllers/event.controller")

app.use(cors());
app.use(express.json());

// routers
// User endpoints

// POST /users
// GET /users/:id

// Event endpoints
// POST /events
// GET /events
app.get("/api/events", getEvents);
// GET /events/:id
app.get("/api/events/:event_id", getEvent);
// PATCH /events/:id
// DELETE /events/:id

// Attending endpoints
// POST /events/:id/attend
// DELETE /events/:id/attend
// GET /events/:id/attendees

module.exports = app;