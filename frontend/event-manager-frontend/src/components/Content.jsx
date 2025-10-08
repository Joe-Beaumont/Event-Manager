import { Route, Routes } from 'react-router-dom'
import Home from "../pages/Home"
import EventsList from '../pages/EventsList'
import EventDetail from '../pages/EventDetail'
import MyEvents from '../pages/MyEvents'
import ErrorMessage from '../components/ErrorMessage'


export function Content() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<EventsList />} />
                <Route path="/events/:event_id" element={<EventDetail />} />
                <Route path="/users/:user_id/events" element={<MyEvents />} />
                <Route path="/error" element={<ErrorMessage />} />                                                            
            </Routes>
        </div>
    )
}