import { Link } from 'react-router-dom'

export function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/events">Upcoming Events</Link>
            <Link to="/users/1/events">My Events</Link>
        </nav>
    )
}