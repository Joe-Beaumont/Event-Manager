import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../contexts/UserContext";
import { checkUserRegistration } from "../api";

export default function Booking({ event, user, onRegister, onUnregister }) {
  const { user: contextUser } = useContext(CurrentUser);
  const activeUser = user || contextUser;

  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeUser && event) {
      checkUserRegistration(event.event_id, activeUser.user_id)
        .then(setRegistered)
        .catch(() => setRegistered(false));
    }
  }, [activeUser, event]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await onRegister();
      setRegistered(true);
    } catch (err) {
      console.error("Failed to register:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async () => {
    setLoading(true);
    try {
      await onUnregister();
      setRegistered(false);
    } catch (err) {
      console.error("Failed to unregister:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    if (!activeUser || !event) return;

    const baseURL =
      import.meta.env.MODE === "development"
        ? "http://localhost:9090"
        : "https://event-manager-5ow3.onrender.com";

    window.location.href = `${baseURL}/auth/google?user_id=${activeUser.user_id}&event_id=${event.event_id}`;
  };

  return (
    <div className="booking-buttons">
      {!registered ? (
        <button
          className="button"
          onClick={handleRegister}
          disabled={loading}>
          {loading ? "Registering..." : "Register for this event"}
        </button>
      ) : (
        <button
          className="button"
          onClick={handleUnregister}
          disabled={loading}>
          {loading ? "Unregistering..." : "Unregister"}
        </button>
      )}

      {registered && (
        <button
          className="button"
          onClick={handleAddToCalendar}
          disabled={loading}
          style={{ marginLeft: "1rem" }}
        >
          Add to Google Calendar
        </button>
      )}
    </div>
  );
}
