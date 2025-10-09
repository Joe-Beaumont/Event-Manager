import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postUser, loginUser } from "../api";
import { CurrentUser } from "../contexts/UserContext";


export default function Register() {
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        role: "member"
    });


    const { setUser } = useContext(CurrentUser);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postUser(newUser)
            .then((newUser) =>
                loginUser(newUser.email, newUser.password)
                    .then((user) => {
                        setUser(user);
                        navigate('/')
                    })
                    .catch((err) => {
                        setError(err.message);
                    })
            )
            .catch((err) => alert(err.message));
    };

    return (
        <div>
            <h2>Register new user</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="email"
                    value={newUser.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleChange}
                />
                <select name="role" value={newUser.role} onChange={handleChange}>
                    <option value={"staff"}>Staff</option>
                    <option value={"member"}>Member</option>
                </select>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}