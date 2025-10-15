import path from 'path';
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

const __dirname = path.resolve();
const frontendDist = path.join(__dirname, '../frontend/event-manager-frontend/dist');
app.use(express.static(frontendDist));

// Catch-all route to serve index.html for React Router
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
    return handle404(req, res);
  }
  res.sendFile(path.join(frontendDist, 'index.html'));
});


// Error Handling middleware
app.use(handlePostgresErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
