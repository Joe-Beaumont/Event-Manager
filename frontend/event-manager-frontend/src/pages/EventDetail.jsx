import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEvents, postAttending, cancelAttending } from "../api";
import { CurrentUser } from "../contexts/UserContext";
import Booking from "../components/Booking";
import AttendanceCount from "../components/AttendanceCount";

export default function EventDetail() {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

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
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUnregister = async () => {
    try {
      await cancelAttending(event_id, user.user_id);
      setRegistered(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading event...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div className="container">
      <h2 className="h2">{event.name}</h2>
      <p className="p">{event.description}</p>
      <p className="p">{new Date(event.start_time).toLocaleString()}</p>
      <p className="p">{new Date(event.end_time).toLocaleString()}</p>
      {event.image_url && <img src={event.image_url} alt={event.name} />}

      <Booking
        event={event}
        user={user}
        registered={registered}
        onRegister={handleRegister}
        onUnregister={handleUnregister}
      />
      <AttendanceCount
        event_id={event_id}
      />
    </div>
  );
}