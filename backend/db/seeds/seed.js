const db = require("../connection");
const format = require("pg-format");


//Need to fill in table names and data variable params
// Split create and populate queries into functions
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

function createUsers (){
    return db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(40) NOT NULL
        );`)
}

function createEvents (){
    return db.query(`CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        description VARCHAR(320) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        created_by INT REFERENCES users(user_id)
        );`)
}

function createAttending (){
    return db.query(`CREATE TABLE attending (
        attending_id SERIAL PRIMARY KEY,
        event_id INT REFERENCES events(event_id),
        user_id INT REFERENCES users(user_id)
        );`)
}

function populateUsers(userData){
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

function populateEvents(eventData){
    const mappedEvents = eventData.map((event) => {
        return [event.name, event.description, event.date, event.time, event.created_by]
    });
    const insertEvents = format(
        `INSERT INTO events
        (name, description, date, time, created_by)
        VALUES %L
        RETURNING *;`,
        mappedEvents
    );
    return db.query(insertEvents);
};

function populateAttending(attending_data){
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