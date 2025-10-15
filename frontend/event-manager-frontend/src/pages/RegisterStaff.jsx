import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postUser, loginUser } from "../api";
import { CurrentUser } from "../contexts/UserContext";


export default function RegisterStaff() {
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        role: "staff"
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
        <div className='form-container'>
            <h2 className='h2'>Create new staff member</h2>
            <form
                className='form'
                onSubmit={handleSubmit}>
                <input
                    className='input'
                    name="email"
                    placeholder="email"
                    value={newUser.email}
                    onChange={handleChange}
                />
                <input
                    className='input'
                    name="password"
                    placeholder="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleChange}
                />
                <button
                className='button'
                    type="submit"
                >
                    Create
                </button>
            </form>
        </div>
    );
}