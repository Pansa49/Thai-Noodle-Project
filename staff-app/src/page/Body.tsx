import { Outlet, useParams } from "react-router-dom";
import { Header } from "../components/header";

function Body() {
    const { rolename } = useParams();
    return (
        <div className="container mx-auto px-20">
            <Header />
            <p>Role: {rolename}</p>
            <Outlet />
        </div>
    )
}

export default Body