import { createContext, useState, useEffect, } from "react";
import type { ReactNode } from "react";

type UserContextType = {
    userId: string | null;
    username: string | null;
    updateData: (id: string, name: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState<string | null>("");
    const [username, setUsername] = useState<string | null>("");

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            const parsed = JSON.parse(user);
            setUsername(parsed.name);
            setUserId(parsed.id);
        }
    }, []);

    function updateData(id: string, name: string) {
        setUserId(id);
        setUsername(name);
    }

    return (
        <UserContext.Provider value={{ username, userId, updateData }}>
            {children}
        </UserContext.Provider>
    );
}