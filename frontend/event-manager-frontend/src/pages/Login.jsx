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
        //temporary
        setError(null)

        loginUser(email, password)
            .then((user) => {
                setUser(user);
                navigate('/')
            })
            .catch((err) => {
                setError(err.message);
            });
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ display: 'block', margin: '1rem auto', padding: '0.5rem', width: '100%' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ display: 'block', margin: '1rem auto', padding: '0.5rem', width: '100%' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
            </form>
        </div>
    )

}