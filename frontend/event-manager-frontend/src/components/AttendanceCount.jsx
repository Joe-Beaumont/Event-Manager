import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../contexts/UserContext";
import { getAttendees } from "../api";

export default function AttendanceCount({ event_id, user }) {
  const { user: contextUser } = useContext(CurrentUser);
  const activeUser = user || contextUser;
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!event_id) return;

    getAttendees(event_id)
    .then((attendees) => {
        setAttendeeCount(attendees.length || 0);
    })
    .catch((err) => {
        console.error("Failed to fetch attendees:", err);
        setError("Could not load attendee count");
      });
  }, [event_id]);

  if (!activeUser || activeUser.role !== "staff") return null;

  return (
    <div className="container">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p className="p">Number of attendees: {attendeeCount}</p>
      )}
    </div>
  );
}