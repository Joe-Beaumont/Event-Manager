import { Link } from 'react-router';

export function EventCard({ event }) {
    const { event_id } = event;

    return (
        <Link to={`/events/${event_id}`}>
            <div className='event-card'>
                <h2 className='h2'>{event.name}</h2>
                <img
                    className='event-image'
                    src={event.image_url}
                />
                <h3>{event.description}</h3>
                <p>{new Date(event.start_time).toLocaleString()}</p>
                <p>{new Date(event.end_time).toLocaleString()}</p>
            </div>
        </Link>
    )
}