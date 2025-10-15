# Beaumont Conference Center Event Manager

A tech conference event manager app for a fictional conference center.  

Manages events, attendees, and integrates with Google Calendar for scheduling. Built with React on the frontend and Node.js/Express/PostgreSQL on the backend.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
4. [API Overview](#api-overview)  
5. [Google Calendar Integration](#google-calendar-integration)  
6. [Folder Structure](#folder-structure)  
7. [License](#license)

---

## Features

- View, create, and manage events  
- User authentication and role-based access  
- Integration with Google Calendar API for syncing events  
- Responsive UI with dark mode support  
- Upcoming events section with images and details  
- Event cards with hover effects and buttons  

---

## Tech Stack

**Backend**:  
- Node.js, Express  
- PostgreSQL (`pg`, `pg-format`)  
- CORS, dotenv  
- Jest, Supertest (testing)  

**Frontend**:  
- React  
- React Router DOM  
- Axios (API calls)  
- Material UI X date pickers (`@mui/x-date-pickers`)  
- Emotion (`@emotion/react`, `@emotion/styled`)  
- MUI date-fns adapter (`@mui/date-fns`)  

---

## Getting Started

1. Clone the repo:
```bash
git clone <your-repo-url>
cd <repo-folder>

```
2. Install dependencies for backend:

```bash
cd backend
npm install

```
3. Install dependencies for frontend:
```bash
cd frontend
npm install
```

4. Set up .env files (backend & frontend) with your keys, for example:
```bash
DATABASE_URL=postgres://username:password@localhost:5432/dbname
GOOGLE_CLIENT_ID=<your_client_id>
GOOGLE_CLIENT_SECRET=<your_client_secret>
```
5. Run backend:
```bash
npm run dev
```
6. Run frontend:
```bash
npm start
```

---

## API Overview

**User Endpoints**: 

1. POST /api/users – create a new user

2. GET /api/users/:user_id – get user details

3. POST /api/users/login – login user

4. GET /api/users/:user_id/events – get events for a user

**Event Endpoints**:

1. GET /api/events – list all events

2. GET /api/events/:event_id – get event details

3. POST /api/events – create event

4. PATCH /api/events/:event_id – update event

5. DELETE /api/events/:event_id – delete event

**Attendance Endpoints:**

1. POST /api/events/:event_id/attend – register a user to attend an event

2. DELETE /api/events/:event_id/attend – cancel a user’s attendance

3. GET /api/events/:event_id/attend/users – list attendees for an event

4. GET /api/events/:event_id/attend/users/:user_id – check if a user is registered

**Protected routes require authentication.**

---

## Google Calendar Integration

Users can connect their Google account to sync events.

OAuth 2.0 authentication is required.

Event creation or updates can automatically reflect in the connected Google Calendar.

Backend uses googleapis package to manage calendar events.


Folder Structure

beaumont-conference-center/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── README.md
└── .env.example
