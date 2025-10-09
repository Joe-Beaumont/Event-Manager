const db = require("../connection");
const format = require("pg-format");

const seed = ({ userData, eventData, attendingData }) => {
    return db.query("DROP TABLE IF EXISTS attending;")
        .then(() => {
            return db.query("DROP TABLE IF EXISTS events;")
        })
        .then(() => {
            return db.query("DROP TABLE IF EXISTS users;")
        })
        .then(() => {
            return createUsers();
        })
        .then(() => {
            return createEvents();
        })
        .then(() => {
            return createAttending();
        })
        .then(() => {
            return populateUsers(userData);
        })
        .then(() => {
            return populateEvents(eventData);
        })
        .then(() => {
            return populateAttending(attendingData);
        })
};

function createUsers() {
    return db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(40) NOT NULL
        );`)
}

function createEvents() {
    return db.query(`CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        created_by INT REFERENCES users(user_id),
        google_event_id TEXT,
        image_url TEXT
        );`)
}

function createAttending() {
    return db.query(`CREATE TABLE attending (
        attending_id SERIAL PRIMARY KEY,
        event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
        user_id INT REFERENCES users(user_id)
        );`)
}

function populateUsers(userData) {
    const mappedUsers = userData.map((user) => {
        return [user.email, user.password, user.role]
    });
    const insertUsers = format(
        `INSERT INTO users
        (email, password, role)
        VALUES
        %L
        RETURNING *;`,
        mappedUsers
    );
    return db.query(insertUsers);
};

function populateEvents(eventData) {
    const mappedEvents = eventData.map((event) => {
        return [event.name, event.description, event.start_time, event.end_time, event.created_by, event.google_event_id, event.image_url]
    });
    const insertEvents = format(
        `INSERT INTO events
        (name, description, start_time, end_time, created_by, google_event_id, image_url)
        VALUES %L
        RETURNING *;`,
        mappedEvents
    );
    return db.query(insertEvents);
};

function populateAttending(attending_data) {
    const mappedAttending = attending_data.map((attending) => {
        return [attending.event_id, attending.user_id]
    });
    const insertAttending = format(
        `INSERT INTO attending
        (event_id, user_id)
        VALUES %L
        RETURNING *;`,
        mappedAttending
    );
    return db.query(insertAttending);
};

module.exports = seed;