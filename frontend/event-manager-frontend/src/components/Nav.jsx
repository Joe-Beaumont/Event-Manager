import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUser } from "../contexts/UserContext";

export function Nav() {
    const { user, setUser } = useContext(CurrentUser);

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/events">Upcoming Events</Link>
            <Link to="/users/1/events">My Events</Link>
            {user?.role === "staff" ? (
                <Link to="/events/create">Post New Event</Link>
            ) : null}

            {user ? (
                <>
                    <span>Welcome, {user.email}</span>
                    <button onClick={() => setUser(null)}>Logout</button>
                </>
            ) : (
                <Link to="/users/login">Login</Link>
            )}
            <Link to="/users/register">Register</Link>

        </nav>
    );
}