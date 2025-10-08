import axios from 'axios';

const isLocal = true;
const baseURL = isLocal
    ? "http://localhost:9090/api/"
    : "https://event-manager-5ow3.onrender.com/api/"

//Endpoints

// User endpoints

// // POST /users
// app.post("/api/users", postUser);
// // GET /users/:id
// app.get("/api/users/:user_id", getUser);
export function getUsers(user_id) {
    return axios.get(`${baseURL}users/${user_id}`)
        .then((response) => {
            return response.data.user
        })
        .catch((error) => {
            throw new Error(`Error: ${error.response?.data?.msg || error.message}`)
        });
};
// // Event endpoints
// // POST /events
// app.post("/api/events", postEvent);


// // GET /events
// app.get("/api/events", getEvents);
// // GET /events/:id
// app.get("/api/events/:event_id", getEvent);

export function getEvents(event_id) {
    if (event_id) {
        return axios.get(`${baseURL}events/${event_id}`)
            .then((response) => {
                return response.data.event
            })
            .catch((error) => {
                throw new Error(`Error: ${error.response?.data?.msg || error.message}`)
            })
    } else {
        return axios.get(`${baseURL}events`)
            .then((response) => {
                console.log(response)
                return response.data.events
            })
            .catch((error) => {
                throw new Error(`Error: ${error.response?.data?.msg || error.message}`)
            });
    };
};
// // PATCH /events/:id
// app.patch("/api/events/:event_id", patchEvent);
// // DELETE /events/:id
// app.delete("/api/events/:event_id", cancelEvent);

// // Attending endpoints
// // POST /events/:id/attend
// app.post("/api/events/:event_id/attend", postAttending);
// // DELETE /events/:id/attend
// app.delete("/api/events/:event_id/attend", cancelAttending);
// // GET /events/:id/attendees
// app.get("/api/events/:event_id/attendees", getAttending);

export function getAttendees(event_id) {
    return axios.get(`${baseURL}events/${event_id}/attendees`)
        .then((response) => {
            return response.data.attending
        })
        .catch((error) => {
            throw new Error(`Error: ${error.response?.data?.msg || error.message}`)
        });
};