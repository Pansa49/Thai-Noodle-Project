import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function Body() {
    return (
        <div className="mx-auto w-full max-w-[900px] px-4 md:px-10">
            <Header />
            <Outlet />
        </div>
    )
}