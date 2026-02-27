import { Outlet, useParams } from "react-router-dom";
import { Header } from "../components/header";

function Body() {
    const { rolename } = useParams();
    return (
        <div className="mx-auto max-w-[900px] px-16">
            <Header />
            <p>Role: {rolename}</p>
            <Outlet />
        </div>
    )
}

export default Body