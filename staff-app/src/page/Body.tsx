import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function Body() {
    return (
        <div
            id="body-container"
            className="mx-auto w-full max-w-[900px] px-4 md:px-10 flex flex-col h-screen">
            <Header />
            <Outlet />
        </div>
    )
}