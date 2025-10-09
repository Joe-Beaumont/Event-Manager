import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../api"


export default function EventDetail() {
  const { event_id } = useParams();
  const [event, setEvent] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents(event_id)
      .then(setEvent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [event_id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!event) return <p>No event found</p>

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.date}</p>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
    </div>
  );
};
