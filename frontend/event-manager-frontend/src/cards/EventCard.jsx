import { Link } from 'react-router';

export function EventCard({ event }) {
    const { event_id } = event;

    return (
        <Link to={`/events/${event_id}`}>
            <div>
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <p>{new Date(event.start_time).toLocaleString()}</p>
                <p>{new Date(event.end_time).toLocaleString()}</p>
                <img
                src={event.image_url}
                />
            </div>
        </Link>
    )
}