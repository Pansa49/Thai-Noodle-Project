import { createContext, useState } from "react";

type UsertContextType = {
    id: string;
    username: string;

    updateData: (id: string, user: string) => void;
};

export const UserContext = createContext<UsertContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [id, setId] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const updateData = (id: string, user: string) => {
        setId(id);;
        setUsername(user);
    }


    return (
        <UserContext.Provider value={{
            id,
            username,
            updateData
        }}
        >
            {children}
        </UserContext.Provider>
    );
}