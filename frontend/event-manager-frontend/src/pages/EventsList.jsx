import { useEffect, useState } from "react";
import { getEvents } from "../api";
import { EventCard } from "../cards/EventCard";

export default function EventsList({}) {
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
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <div key={event.event_id}>
            <EventCard event={event} />
          </div>
        ))}
      </ul>
    </div>
  );
};
