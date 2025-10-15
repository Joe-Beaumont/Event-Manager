import { useEffect, useState } from "react";
import { getEvents } from "../api";
import { EventCard } from "../cards/EventCard";

export default function EventsList({ }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="events-list">
      <h2 className="h2">Upcoming Events</h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.event_id} className="event-item">
            <EventCard event={event} />
          </div>
        ))}
      </div>

    </div>
  );
};
