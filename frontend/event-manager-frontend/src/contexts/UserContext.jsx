import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  return (
    <CurrentUser.Provider value={{ user, setUser }}>
      {children}
    </CurrentUser.Provider>
  );
};
