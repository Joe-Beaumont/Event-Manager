import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUser } from "../contexts/UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(CurrentUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
