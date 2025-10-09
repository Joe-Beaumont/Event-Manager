import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postEvent } from "../api";

export default function CreateEvent() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postEvent(newEvent)
      .then((newEvent) => navigate(`/events/${newEvent.event_id}`))
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Event name"
          value={newEvent.name}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          value={newEvent.date}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newEvent.description}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}