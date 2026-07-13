import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function Body() {
    return (
        <div
            id="body-container"
            className="mx-auto flex h-[90vh] max-h-[850px] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <Header />
            <Outlet />
        </div>
    )
}