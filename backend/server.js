const path = require('path');
const express = require('express');
const cors = require('cors');
const { handle404, handlePostgresErrors, handleCustomErrors, handleServerErrors } = require('./controllers/error.controller');

const apiRouter = require('./routers/api.router');
const googleAuthRoutes = require('./routers/googleAuth.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.use("/auth", googleAuthRoutes);

const frontendDist = path.join(__dirname, '../frontend/event-manager-frontend/dist');
app.use(express.static(frontendDist));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/auth')) return handle404(req, res);
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.use(handlePostgresErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;