import { useEffect, useState } from "react";
import { getEvents } from "../api";
import { EventCard } from "../cards/EventCard";

export function FeaturedEvents() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getEvents()
            .then((allEvents) => {
                const top3 = allEvents.sort((a, b) => b.votes - a.votes).slice(0, 3);
                setEvents(top3);
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        },[])

        
    useEffect(() => {
        if (events.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % events.length
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [events]);

  if (isLoading) return <p className="loading">Loading events...</p>;
  if (error) return <p  className="error">{error}</p>;

    if (events.length === 0) return <p>No featured events found.</p>;

    return (
        <div className="flex justify-center">
            <EventCard event={events[currentIndex]} />
        </div>
    );
}