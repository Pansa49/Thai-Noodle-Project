import type { JSX } from "react/jsx-dev-runtime";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}