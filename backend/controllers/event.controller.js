const { fetchEvents, fetchEvent, insertEvent } = require("../models/event.model");
const { fetchUser } = require("../models/user.model");

exports.getEvents = (req, res, next) => {
    fetchEvents()
    .then((events) => {
        res.status(200).send({ events });
    })
    .catch(next);
};

exports.getEvent = (req, res, next) => {
    const { event_id } = req.params
    const regex = /\d/
    if(!regex.test(event_id)) {
       return res.status(400).send({ msg: "Invalid event_id" }) 
    }
    fetchEvent(event_id)
    .then((event) => {
        if (!event) {
            return res.status(404).send({ msg: "No events with that id" });
        }
        res.status(200).send({ event })
    })
    .catch(next);
};

exports.postEvent = (req, res, next) => {
    const { name, description, date, time, created_by } = req.body;
    const regexDate = /\d\d\d\d-\d\d-\d\d/
    const regexTime = /\d\d:\d\d/
    if (!name || !description || !date || !time || !created_by )
        return res.status(400).send({ msg: "Missing required field(s)" })
    if (!regexDate.test(date))
        return res.status(400).send({ msg: "Invalid date" })
    if (!regexTime.test(time))
        return res.status(400).send({ msg: "Invalid time" })
    fetchUser(created_by)
    .then((user) => {
        if (!user) {
            return Promise.reject({ status: 400, msg: "Invalid User" });
        }
        if (user.role !== "staff") {
            return Promise.reject({ status: 400, msg: "Only staff can create events" });
        }
            return insertEvent(name, description, date, time, created_by)
        })
    .then((event) => {
        res.status(201).send(event)
    })
    .catch(next);
};