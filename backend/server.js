const express = require("express");
const app = express();
const cors = require("cors");
const { handle404, handlePostgresErrors, handleCustomErrors, handleServerErrors } = require("./controllers/error.controller");

app.use(cors());
app.use(express.json());

// Routers

const apiRouter = require("./routers/api.router")
app.use("/api", apiRouter)

// Error Handling middleware

app.all(/.*/, handle404);

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;