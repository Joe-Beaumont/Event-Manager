import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEvents, postAttending } from "../api";
import { CurrentUser } from "../contexts/UserContext";

export default function EventDetail() {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [showCalendarOption, setShowCalendarOption] = useState(false);

  const { user } = useContext(CurrentUser);

  useEffect(() => {
    getEvents(event_id)
      .then(setEvent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [event_id]);

  const handleRegister = async () => {
    if (!user) {
      alert("You must be logged in to register for an event.");
      return;
    }

    try {
      await postAttending(event_id, user.user_id);
      setRegistered(true);
      setShowCalendarOption(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddToCalendar = () => {
  if (!user || !event) return;

  const baseURL =
    import.meta.env.MODE === "development"
      ? "http://localhost:9090"
      : "https://event-manager-5ow3.onrender.com";

  window.location.href = `${baseURL}/auth/google?user_id=${user.user_id}&event_id=${event.event_id}`;
};




  if (loading) return <p>Loading event...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{new Date(event.start_time).toLocaleString()}</p>
      <p>{new Date(event.end_time).toLocaleString()}</p>
      {event.image_url && <img src={event.image_url} alt={event.name} />}

      {!registered && (
        <button onClick={handleRegister}>Register for this event</button>
      )}

      {showCalendarOption && (
        <button onClick={handleAddToCalendar}>
          Add to Google Calendar
        </button>
      )}
    </div>
  );
}