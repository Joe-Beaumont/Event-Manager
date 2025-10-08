import axios from 'axios';

const isLocal = true;
const baseURL = isLocal
    ? "http://localhost:9090/api/"
    : "https://event-manager-5ow3.onrender.com/api/"

function handleError(error) {
    throw new Error(`Error: ${error.response?.data?.msg || error.message}`);
}

//Endpoints

// User endpoints

// // POST /users
// app.post("/api/users", postUser);
export function postUser(userData) {
    return axios.post(`${baseURL}users`, userData)
        .then((response) => {
            return response.data.user
        })
        .catch(handleError)
}
// // GET /users/:id
// app.get("/api/users/:user_id", getUser);
export function getUser(user_id) {
    return axios.get(`${baseURL}users/${user_id}`)
        .then((response) => {
            return response.data.user
        })
        .catch(handleError);
};
// // Event endpoints
// // POST /events
// app.post("/api/events", postEvent);
export function postEvent(eventData) {
    return axios.post(`${baseURL}events`, eventData)
        .then((response) => {
            return response.data.event
        })
        .catch(handleError)
}

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
            .catch(handleError);
    } else {
        return axios.get(`${baseURL}events`)
            .then((response) => {
                return response.data.events
            })
            .catch(handleError);
    };
};
// // PATCH /events/:id
// app.patch("/api/events/:event_id", patchEvent);

export function patchEvent(event_id, updateData) {
    return axios.patch(`${baseURL}events/${event_id}`, updateData)
        .catch(handleError)
}

// // DELETE /events/:id
// app.delete("/api/events/:event_id", cancelEvent);

export function deleteEvent(event_id) {
    return axios.delete(`${baseURL}events/${event_id}`)
        .then((response) => {
            if (response.status === 204) return true
            throw new Error("Unexpected response from server")
        })
        .catch(handleError)
}

// // Attending endpoints

// // POST /events/:id/attend
// app.post("/api/events/:event_id/attend", postAttending);

export function postAttending(event_id, user_id) {
    return axios.post(`${baseURL}events/${event_id}/attend`, { user_id })
        .then((response) => {
            return response.data.attending
        })
        .catch(handleError)
}

// // DELETE /events/:id/attend
// app.delete("/api/events/:event_id/attend", cancelAttending);

export function cancelAttending(event_id, user_id) {
    return axios.delete(`${baseURL}events/${event_id}/attend`, { data: { user_id } })
        .then((response) => {
            if (response.status === 204) return true
            throw new Error("Unexpected response from server")
        })
        .catch(handleError)
}

// // GET /events/:id/attendees
// app.get("/api/events/:event_id/attendees", getAttending);

export function getAttendees(event_id) {
    return axios.get(`${baseURL}events/${event_id}/attendees`)
        .then((response) => {
            return response.data.attending
        })
        .catch(handleError);
};