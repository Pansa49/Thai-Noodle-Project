import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function Root() {

    return (
        <div
            id="root-container"
            className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased pb-24">            <Header />
            <Outlet />
        </div>
    )
}

export default Root