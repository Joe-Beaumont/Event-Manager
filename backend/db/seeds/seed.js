const db = require("../connection");
const format = require("pg-format");


//Need to fill in table names and data variable params
// Split create and populate queries into functions
const seed = () => {
    return db.query("DROP TABLE IF EXISTS")
    .then(() => {
        return db.query("DROP TABLE IF EXISTS")
    })
    .then(() => {
        return db.query("DROP TABLE IF EXISTS")
    })
    .then(() => {
        return db.query("")
    })
}

module.exports = seed;