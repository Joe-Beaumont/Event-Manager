const db = require("../db/connection");
const format = require("pg-format");

exports.fetchEvents = () => {
    return db.query(`SELECT * FROM events e ORDER BY e.start_time ASC;`)
        .then(({ rows }) => rows);
};

exports.fetchEvent = (event_id) => {
    return db.query(`SELECT * FROM events WHERE event_id = $1`, [event_id])
        .then(({ rows }) => rows[0]);
};

exports.insertEvent = (name, description, start_time, end_time, created_by, google_event_id, image_url) => {
    const newEvent = format(`INSERT INTO events
        (name, description, start_time, end_time, created_by, google_event_id, image_url)
        VALUES %L RETURNING *`,
        [[name, description, start_time, end_time, created_by, google_event_id, image_url]]
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