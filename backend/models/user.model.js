const db = require("../db/connection");
const format = require("pg-format");

exports.fetchUser = (user_id) => {
    return db.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        .then(({ rows }) => rows[0]);
};

exports.insertUser = (email, password, role) => {
    const newUser = format(`INSERT INTO users
        (email, password, role)
        VALUES %L RETURNING *`,
        [[email, password, role]]
    );
    return db.query(`SELECT * FROM users WHERE email = $1`, [email])
        .then(({ rows }) => {
            if (rows.length > 0) {
                return Promise.reject({ status: 400, msg: "Email already exists" })
            }
        })
        .then(() => {
            return db.query(newUser)
                .then(({ rows }) => {
                    return { user: rows[0] }
                });
        })
};

exports.fetchUserByEmail = (email) => {
    return db
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then(({ rows }) => rows[0]);
}

exports.fetchUserEvents = (user_id) => {
    return db
    .query(`SELECT e.* FROM events e
        JOIN attending a ON e.event_id = a.event_id
        WHERE a.user_id = $1;`, [user_id])
    .then(({ rows }) => rows);
}