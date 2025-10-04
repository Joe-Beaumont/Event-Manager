const db = require("../db/connection");
const format = require("pg-format");

exports.fetchEvents = () => {
    return db.query(`SELECT * FROM events e ORDER BY e.date;`)
        .then(({ rows }) => rows);
};

exports.fetchEvent = (event_id) => {
    return db.query(`SELECT * FROM events WHERE event_id = $1`, [event_id])
        .then(({ rows }) => rows[0]);
};

exports.insertEvent = (name, description, date, time, created_by) => {
    const newEvent = format(`INSERT INTO events
        (name, description, date, time, created_by)
        VALUES %L RETURNING *`,
        [[name, description, date, time, created_by]]
    );
    return db.query(newEvent)
        .then(({ rows }) => {
            return { event: rows[0] }
        });
};

exports.updateEvent = (patchString, patchFields) => {
    return db.query(patchString, patchFields)
        .then(({ rows }) => {
            return { event: rows[0] }
        });
};

exports.deleteEvent = (event_id) => {
    return db.query(`DELETE FROM events WHERE event_id = $1`, [event_id])
        .then(() => {
            return
        });
};