import { Link } from 'react-router';

export function EventCard({ event }) {
    const { event_id, name, description, date, location } = event;

    return (
        <Link to={`/events/${event_id}`}>
            <div>
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{date}</p>
                <p>{location}</p>
            </div>
        </Link>
    )
}