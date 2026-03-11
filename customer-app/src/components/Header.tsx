import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../hook/use-cart-context";
import { useEffect } from "react";
import { getOrderSessionStatus } from "../../../shared/api/fetchData"


export function Header() {

    const { items } = useCartContext()
    const { tableNo, sessionId } = useParams<{ tableNo: string; sessionId: string }>();

    if (!tableNo || !sessionId) return null

    const navigate = useNavigate();

    useEffect(() => {
        async function checkSession() {
            if (!tableNo || !sessionId) return;

            const isActive = await getOrderSessionStatus(tableNo, sessionId);

            if (!isActive) {
                alert("ออเดอร์นี้ถูกปิดแล้ว",);
                navigate("/close");
            }
        }

        checkSession();
    }, [tableNo, sessionId, navigate]);

    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
                <nav className="flex gap-5 text-smmd:text-base md:gap-12text-gray-600 font-medium">
                    <NavLink
                        to={`/menu/${tableNo}/${sessionId}`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white rounded-md"
                                : "hover:bg-blue-300 rounded-md transition"
                        }
                    >
                        Menu
                    </NavLink>

                    <NavLink
                        to={`list/${tableNo}/${sessionId}`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white rounded-md relative cursor-pointer"
                                : "hover:bg-blue-300 rounded-md transition relative cursor-pointer"
                        }
                    >

                        List
                        {items.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {items.length}
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to={`bill/${tableNo}/${sessionId}`}
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white rounded-md"
                                : "hover:bg-blue-300 rounded-md transition"
                        }
                    >
                        Bill
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
