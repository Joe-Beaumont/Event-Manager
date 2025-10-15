const path = require('path');
const express = require("express");
const app = express();
const cors = require("cors");
const { handle404, handlePostgresErrors, handleCustomErrors, handleServerErrors } = require("./controllers/error.controller");

app.use(cors());
app.use(express.json());

// Routers
const apiRouter = require("./routers/api.router")
app.use("/api", apiRouter)

const googleAuthRoutes = require("./routers/googleAuth.router");
app.use("/auth", googleAuthRoutes);

// Serve React frontend
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));


// Error Handling middleware
app.use(handlePostgresErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
