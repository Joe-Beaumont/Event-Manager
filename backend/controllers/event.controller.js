const { fetchEvents, fetchEvent, insertEvent, updateEvent, deleteEvent } = require("../models/event.model");
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
    if (!regex.test(event_id)) {
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
    const regexDate = /^\d{4}-\d{2}-\d{2}$/
    const regexTime = /^\d{2}:\d{2}$/
    if (!name || !description || !date || !time || !created_by)
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

exports.patchEvent = (req, res, next) => {
    const { event_id } = req.params;
    const { name, description, date, time } = req.body;
    fetchEvent(event_id)
        .then((event) => {
            if (!event) {
                return Promise.reject({ status: 404, msg: "No events with that id" });
            }
            const regexDate = /^\d{4}-\d{2}-\d{2}$/
            const regexTime = /^\d{2}:\d{2}$/
            const patchFields = [];
            let patchString = `UPDATE events e SET `;
            const setClauses = [];
            if (name) {
                patchFields.push(name);
                setClauses.push(`name = $${patchFields.length}`);
            }

            if (description) {
                patchFields.push(description);
                setClauses.push(`description = $${patchFields.length}`);
            }

            if (date) {
                if (!regexDate.test(date)) {
                    return res.status(400).send({ msg: "Invalid date" });
                }
                patchFields.push(date);
                setClauses.push(`date = $${patchFields.length}`);
            }

            if (time) {
                if (!regexTime.test(time)) {
                    return res.status(400).send({ msg: "Invalid time" });
                }
                patchFields.push(time);
                setClauses.push(`time = $${patchFields.length}`);
            }
            patchString += setClauses.join(", ");
            patchFields.push(event_id);
            patchString += ` WHERE e.event_id = $${patchFields.length} RETURNING *`;

            return updateEvent(patchString, patchFields)
        })
        .then((event) => {
            res.status(201).send(event)
        })
        .catch(next)
};

exports.cancelEvent = (req, res, next) => {
    const { event_id } = req.params;
    const regex = /^\d+$/;
    if (!regex.test(event_id)) {
        return res.status(400).send({ msg: "Invalid event_id" });
    }

    fetchEvent(event_id)
        .then((event) => {
            if (!event) {
                return res.status(404).send({ msg: "No events with that id" });
            }
        });
    deleteEvent(event_id)
        .then(() => {
            return res.status(204).send();
        })
        .catch(next);
}