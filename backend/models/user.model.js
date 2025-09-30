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
    return db.query(newUser)
    .then(({ rows }) => {
        return {user: rows[0]}
    });
};