const db = require("../db/connection");

exports.fetchEvents = () => {
    return db.query(`SELECT * FROM events;`)
    .then(({ rows }) => rows);
};

exports.fetchEvent = (event_id) => {
    return db.query(`SELECT * FROM events WHERE event_id = $1`, [event_id])
    .then(({ rows }) => rows[0]);
}