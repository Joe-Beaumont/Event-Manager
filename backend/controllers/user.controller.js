const { fetchUser, insertUser, fetchUserByEmail } = require("../models/user.model");

exports.getUser = (req, res, next) => {
    const { user_id } = req.params
    const regex = /^\d+$/;
    if (!regex.test(user_id)) {
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
    if (!email || !password || !role)
        return res.status(400).send({ msg: "Missing required field(s)" })
    if (role !== "staff" && role !== "member")
        return res.status(400).send({ msg: "Role must either be staff or member" })
    emailRegex = /([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    passwordRegex = /((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/

    if (!emailRegex.test(email)) return res.status(401).send({ msg: "Invalid email" });
    if (!passwordRegex.test(password)) return res.status(401).send({ msg: "Invalid password, please include a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces." });
    insertUser(email, password, role)
        .then((user) => {
            res.status(201).send(user)
        })
        .catch(next);
};

exports.getUserByEmail = (req, res, next) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).send({ msg: "Email is required" });
    }

    fetchUserByEmail(email)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ msg: "User not found" });
            }
            res.status(200).send({ user });
        })
        .catch(next);
}

exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ msg: "Email and password required" });
    }

    fetchUserByEmail(email)
        .then((user) => {
            if (!user) return res.status(404).send({ msg: "User not found" });
            if (user.password !== password)
                return res.status(401).send({ msg: "Invalid credentials" });

            res.status(200).send({ user });
        })
        .catch(next);
};
