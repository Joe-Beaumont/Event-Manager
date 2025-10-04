const { attendEvent, deleteAttending, fetchAttending } = require("../models/attending.model");
const { fetchEvent } = require("../models/event.model")

exports.postAttending = (req, res, next) => {
    const { user_id } = req.body;
    const { event_id } = req.params;
    const regex = /^\d+$/;
    if (!regex.test(event_id)) {
        return Promise.reject({ status: 400, msg: "Invalid event_id" });
    };
    if (!regex.test(user_id)) {
        return Promise.reject({ status: 400, msg: "Invalid user_id" });
    };
    fetchEvent(event_id)
        .then((event) => {

            if (!event) {
                return Promise.reject({ status: 404, msg: "No events with that id" });
            }
            return attendEvent(event_id, user_id)
        })
        .then((attending) => {
            res.status(201).send(attending);
        })
        .catch(next);
}

exports.cancelAttending = (req, res, next) => {
    const { event_id } = req.params;
    const { user_id } = req.body;
    const regex = /^\d+$/;
    if (!regex.test(event_id)) {
        return Promise.reject({ status: 400, msg: "Invalid event_id" });
    };
    if (!regex.test(user_id)) {
        return Promise.reject({ status: 400, msg: "Invalid user_id" });
    };
    fetchEvent(event_id)
        .then((event) => {

            if (!event) {
                return Promise.reject({ status: 404, msg: "No events with that id" });
            }
            return deleteAttending(event_id, user_id)
        })
        .then(() => {
            return res.status(204).send();
        })
        .catch(next);
};

exports.getAttending = (req, res, next) => {
    const { event_id } = req.params;
    const regex = /^\d+$/;
    if (!regex.test(event_id)) {
        return Promise.reject({ status: 400, msg: "Invalid event_id" });
    };
    fetchEvent(event_id)
        .then((event) => {

            if (!event) {
                return Promise.reject({ status: 404, msg: "No events with that id" });
            }
            return fetchAttending(event_id)
        })
        .then((users) => {
            if (users.length === 0) {
                return res.status(404).send({ msg: "No users attending this event" });
            }
            res.status(200).send({ attending: users });
        })
        .catch(next);
};