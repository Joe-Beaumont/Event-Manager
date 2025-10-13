const db = require("../db/connection");
const format = require("pg-format");

exports.attendEvent = (event_id, user_id) => {
    const newAttending = format(`INSERT INTO attending
            (event_id, user_id)
            VALUES %L RETURNING *`,
        [[event_id, user_id]]
    );

    return db.query(newAttending)
        .then(({ rows }) => {
            return { attending: rows[0] }
        });
}

exports.deleteAttending = (event_id, user_id) => {
    return db.query(`DELETE FROM attending WHERE event_id = $1 AND user_id = $2 RETURNING *`, [event_id, user_id])
        .then(() => {
            return
        });
}

exports.fetchAttending = (event_id) => {
    return db.query(`SELECT u.* FROM users u
            INNER JOIN attending a
            ON u.user_id = a.user_id
            WHERE a.event_id = $1;`, [event_id])
        .then(({ rows }) => rows);
}

exports.fetchUserRegistration = (event_id, user_id) => {
    return db.query(
        `SELECT * FROM attending WHERE event_id = $1 AND user_id = $2;`,
        [event_id, user_id])
        .then(({ rows }) => rows);
}