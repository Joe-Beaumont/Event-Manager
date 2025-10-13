import { useSearchParams } from 'react-router-dom';

export default function CalendarConnected() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const event_id = searchParams.get('event_id');

  return (
    <div>
      {status === 'success' ? (
        <p>Event {event_id} added to your Google Calendar!</p>
      ) : (
        <p>There was an error adding event {event_id} to Google Calendar.</p>
      )}
    </div>
  );
}