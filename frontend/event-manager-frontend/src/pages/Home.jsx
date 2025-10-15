import { FeaturedEvents } from "../components/FeaturedEvents";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleViewEvents = () => {
    navigate("/events");
  };

  return (
    <div className="container">
      <section className="home-intro">
        <h2 className="h2">Welcome to the Beaumont Conference Center</h2>
        <p className="p">
          The Beaumont Conference Center is the premier destination for
          all things tech. Boasting 20 years as the leading venue in the Hull and Humberside region. Designed for
          innovation, equipped for the future.
        </p>
        <br />
        <button className="button" onClick={handleViewEvents}>
          View Upcoming Events
        </button>
      </section>

      <section className="features">
        <h3 className="h3">Why Choose Beaumont?</h3>
        <ul className="feature-list">
          <li>Ultra-fast gigabit Wi-Fi and smart networking systems</li>
          <li>Hybrid-ready auditoriums for live streaming and workshops</li>
          <li>Dedicated on-site technical support</li>
          <li>Customizable spaces for startups or global conferences</li>
        </ul>
        <br />
      </section>

      <section className="button">
        <h3 className="h3">Upcoming Highlights</h3>
        <FeaturedEvents />
      </section>

      <section className="home-contact">
        <h3 className="h3">Host Your Next Event</h3>
        <p className="p">
          Whether you're launching a new product, hosting a hackathon, or running a
          developer meetup — our team is ready to make it a success.
        </p>
        <br />
        <p className="p">
          Email us at Beaumont.admin@example.com
        </p>
      </section>
    </div>
  );
}