import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function Root() {

    return (
        <div className="container mx-auto">
            <Header />
            <Outlet />
        </div>
    )
}

export default Root