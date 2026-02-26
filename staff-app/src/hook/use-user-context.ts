import { useContext } from "react";
import { UserContext } from "../context/context.tsx";

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within CartProvider");
    }
    return context;
};
