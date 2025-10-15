import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUser } from "../contexts/UserContext";

export default function Login() {
    const { user, setUser } = useContext(CurrentUser);

    return (
        <nav className='nav'>
            {user ? (
                <>
                    <span className="greeting">Welcome {user.email}</span>
                    <button className='nav-link' onClick={() => setUser(null)}>Logout</button>
                </>
            ) : (
                <div>
                    <Link className='nav-link' to="/users/login">Login</Link>
                    <Link className='nav-link' to="/users/register/member">Register</Link>
                </div>
            )}
        </nav>
    );
}