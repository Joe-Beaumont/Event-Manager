import { Link } from 'react-router';

export function EventCard({ event }) {
    const { event_id, name, description, date, location } = event;

    return (
        <Link to={`/events/${event_id}`}>
            <div>
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <p>{event.start_time}</p>
                <p>{event.end_time}</p>
                <img
                src={event.image_url}
                />
            </div>
        </Link>
    )
}