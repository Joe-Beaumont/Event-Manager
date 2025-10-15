import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUser } from "../contexts/UserContext";

export function Nav() {
    const { user, setUser } = useContext(CurrentUser);

    return (
        <nav className={`nav ${user?.role === "staff" ? "staff" : ""}`}>
            <Link className='nav-link' to="/">Home</Link>
            <Link className='nav-link' to="/events">Upcoming Events</Link>
            <Link className='nav-link' to="/users/1/events">My Events</Link>
            {user?.role === "staff" ? (
                <div>
                    <Link className='nav-link' to="/events/create">Post New Event</Link>
                    <Link className='nav-link' to="/users/register/staff">Create Staff Member</Link>
                </div>
            ) : null}
        </nav>
    );
}