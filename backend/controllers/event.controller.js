const { fetchEvents, fetchEvent } = require("../models/event.model");

exports.getEvents = (req, res, next) => {
    fetchEvents()
    .then((events) => {
        res.status(200).send({ events });
    })
    .catch(next);
}

exports.getEvent = (req, res, next) => {
    const { event_id } = req.params
    fetchEvent(event_id)
    .then((event) => {
        res.status(200).send({ event })
    })
}