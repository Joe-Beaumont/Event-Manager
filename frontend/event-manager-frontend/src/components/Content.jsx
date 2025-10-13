import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser } from "../contexts/UserContext";

import Home from "../pages/Home";
import EventsList from "../pages/EventsList";
import EventDetail from "../pages/EventDetail";
import MyEvents from "../pages/MyEvents";
import CreateEvent from "../pages/CreateEvent";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CalendarConnected from "../pages/CalendarConnected";
import ProtectedRoute from "../components/ProtectedRoute";

export function Content() {
    const { user } = useContext(CurrentUser);

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <Navigate to="/users/login" replace />
                        )
                    }
                />
                {/* Public routes */}
                <Route path="/users/login" element={<Login />} />
                <Route path="/users/register" element={<Register />} />

                {/* catch route */}
                <Route path="*" element={<Navigate to="/" replace />} />
                {/* Protected routes */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events"
                    element={
                        <ProtectedRoute>
                            <EventsList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/create"
                    element={
                        <ProtectedRoute>
                            <CreateEvent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/:event_id"
                    element={
                        <ProtectedRoute>
                            <EventDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/users/:user_id/events"
                    element={
                        <ProtectedRoute>
                            <MyEvents />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/calendar-connected"
                    element={
                        <ProtectedRoute>
                            <CalendarConnected />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}
