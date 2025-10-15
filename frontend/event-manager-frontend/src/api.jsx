import axios from 'axios';

const baseURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:9090/api/' 
  : 'https://event-manager-5ow3.onrender.com/api/';

function handleError(error) {
    throw new Error(`Error: ${error.response?.data?.msg || error.message}`);
}

// User endpoints

export function postUser(userData) {
    return axios.post(`${baseURL}users`, userData)
        .then((response) => {
            return response.data.user
        })
        .catch(handleError)
}

export function getUser(user_id) {
    return axios.get(`${baseURL}users/${user_id}`)
        .then((response) => {
            return response.data.user
        })
        .catch(handleError);
};

export function getUserEvents(user_id) {
    return axios.get(`${baseURL}users/${user_id}/events`)
        .then((response) => {
            return response.data.events
        })
        .catch(handleError);
};


// login

export function loginUser(email, password) {
  return axios.post(`${baseURL}users/login`, { email, password })
    .then((response) => response.data.user)
    .catch((error) => {
      throw new Error(error.response?.data?.msg || "Login failed");
    });
}


// Event endpoints

export function postEvent(eventData) {
    return axios.post(`${baseURL}events`, eventData)
        .then((response) => {
            return response.data.event
        })
        .catch(handleError)
}

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

export function patchEvent(event_id, updateData) {
    return axios.patch(`${baseURL}events/${event_id}`, updateData)
        .catch(handleError)
}

export function deleteEvent(event_id) {
    return axios.delete(`${baseURL}events/${event_id}`)
        .then((response) => {
            if (response.status === 204) return true
            throw new Error("Unexpected response from server")
        })
        .catch(handleError)
}

// Attending endpoints

export function postAttending(event_id, user_id) {
    return axios.post(`${baseURL}events/${event_id}/attend`, { user_id })
        .then((response) => {
            return response.data.attending
        })
        .catch(handleError)
}

export function cancelAttending(event_id, user_id) {
    return axios.delete(`${baseURL}events/${event_id}/attend`, { data: { user_id } })
        .then((response) => {
            if (response.status === 204) return true
            throw new Error("Unexpected response from server")
        })
        .catch(handleError)
}

export function getAttendees(event_id) {
  return axios
    .get(`${baseURL}events/${event_id}/attend/users`)
    .then((response) => response.data.attending || [])
    .catch(handleError);
}

export function checkUserRegistration(event_id, user_id) {
  return axios
    .get(`${baseURL}events/${event_id}/attend/users/${user_id}`)
    .then((res) => res.data.registered)
    .catch((err) => {
      console.error("Error checking registration:", err);
      return false;
    });
}