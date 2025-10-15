import { useEffect, useState, useContext } from "react";
import { getUserEvents } from "../api";
import { EventCard } from "../cards/EventCard";
import { CurrentUser } from '../contexts/UserContext';

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(CurrentUser);

  useEffect(() => {
    if (!user) return;

    getUserEvents(user.user_id)
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (events.length === 0) {
    return <p className="p">You have no upcoming events.</p>;
  }
  if (loading) return <p className="loading">Loading events...</p>;
  if (error) return <p  className="error">{error}</p>;

  return (
    <div className="container">
      <h2>Here are your upcoming events:</h2>
      <ul>
        {events.map((event) => (
          <div key={event.event_id}>
            <EventCard event={event} />
          </div>
        ))}
      </ul>
    </div>
  );
}