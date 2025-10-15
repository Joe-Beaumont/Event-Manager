import { useState, useContext } from 'react';
import { CurrentUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router';
import { loginUser } from '../api';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { setUser } = useContext(CurrentUser);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)

        loginUser(email, password)
            .then((user) => {
                setUser(user);
                navigate(`/users/{user_id}/events`)
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleClick = () => {
        navigate("/users/register/member");
    };

    return (
        <div className='form-container'>
            <h2 className='label'>Login</h2>
            <form
                className='form'
                onSubmit={handleSubmit}>
                <input
                    className='input'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ display: 'block', margin: '1rem auto', padding: '0.5rem', width: '100%' }}
                />
                <input
                    className='input'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ display: 'block', margin: '1rem auto', padding: '0.5rem', width: '100%' }}
                />
                <button
                    className="button"
                    type="submit"
                >
                    Login
                </button>
                <button
                    className="button"
                    type="button"
                    onClick={handleClick}
                >
                    Sign Up
                </button>
            </form>
        </div>
    )

}