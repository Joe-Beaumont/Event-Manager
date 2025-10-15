import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postEvent } from "../api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function CreateEvent() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    start_time: null,
    end_time: null,
    created_by: null,
    image_url: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field, value) => {
    setNewEvent({ ...newEvent, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postEvent(newEvent)
      .then((newEvent) => navigate(`/events/${newEvent.event_id}`))
      .catch((err) => alert(err.message));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="form-container">
        <h2 className="label">Create New Event</h2>
        <form
          className="form"
          onSubmit={handleSubmit}>
          <input
            className="input"
            name="name"
            placeholder="Event name"
            value={newEvent.name}
            onChange={handleChange}
          />
          <textarea
            className="textarea"
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleChange}
          />
          <DateTimePicker
            label="Start time"
            value={newEvent.start_time}
            onChange={(value) => handleDateChange("start_time", value)}
          />
          <DateTimePicker
            label="End time"
            value={newEvent.end_time}
            onChange={(value) => handleDateChange("end_time", value)}
          />
          <button
          className="button"
          type="submit">Create</button>
        </form>
      </div>
    </LocalizationProvider>
  );
}