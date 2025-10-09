import { createContext, useState } from "react";

export const CurrentUser = createContext()

export const UserProvider =({ children }) => {
    const [user, setUser] = useState("alice.staff@example.com")

    return (
        <CurrentUser.Provider value={{user, setUser}}>
            {children}
        </CurrentUser.Provider>
    )
}