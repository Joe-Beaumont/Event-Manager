const { fetchUser, insertUser } = require("../models/user.model");

exports.getUser = (req, res, next) => {
    const { user_id } = req.params
    const regex = /^\d+$/;
    if(!regex.test(user_id)) {
       return res.status(400).send({ msg: "Invalid User" }) 
    }
    fetchUser(user_id)
    .then((user) => {
        if (!user) {
            return res.status(404).send({ msg: "Invalid User" });
        }
        res.status(200).send({ user })
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role )
       return res.status(400).send({ msg: "Missing required field(s)" })
    if (role !== "staff" && role !== "member")
        return res.status(400).send({ msg: "Role must either be staff or member" })
    insertUser(email, password, role)
    .then((user) => {
        res.status(201).send(user)
    })
    .catch(next);
};