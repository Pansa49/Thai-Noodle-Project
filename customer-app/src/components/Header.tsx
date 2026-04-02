import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../hook/use-cart-context";
import { useEffect, useState } from "react";
import { getOrderSessionStatus } from "../../../shared/api/fetchData";


export function Header() {

    const { items } = useCartContext()
    const { tableNo, sessionId } = useParams<{ tableNo: string; sessionId: string }>();
    const [loading, setLoading] = useState(false);

    if (!tableNo || !sessionId) return null

    const navigate = useNavigate();

    useEffect(() => {
        async function checkSession() {
            if (!tableNo || !sessionId) return;
            try {
                const isActive = await getOrderSessionStatus(tableNo, sessionId);

                if (!isActive) {
                    alert("ออเดอร์นี้ถูกปิดแล้ว");
                    navigate("/close");
                }

            } catch (err) {
                console.error(err);
                console.log({
                    tableNo: tableNo,
                    sessionId: sessionId
                })
            }
        }

        checkSession();
    }, [tableNo, sessionId, navigate]);

    const handleClick = async (e: React.MouseEvent, path: string) => {
        e.preventDefault(); // ❗ หยุด NavLink ก่อน

        if (loading) return; // ❗ กันกดรัว
        setLoading(true);

        try {
            const isActive = await getOrderSessionStatus(tableNo, sessionId);

            if (!isActive) {
                alert("ออเดอร์นี้ถูกปิดแล้ว");
                navigate("/close");
                return;
            }

            navigate(path);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
                <nav className="flex gap-5 text-sm md:text-base md:gap-12 text-gray-600 font-medium">
                    <NavLink
                        to={`/menu/${tableNo}/${sessionId}`}
                        onClick={(e) => handleClick(e, `/menu/${tableNo}/${sessionId}`)}
                        className={({ isActive }) =>
                            `
    ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-300"}
    rounded-md transition
    ${loading ? "opacity-50 pointer-events-none" : ""}
    `
                        }
                    >
                        Menu
                    </NavLink>

                    <NavLink
                        to={`/list/${tableNo}/${sessionId}`}
                        onClick={(e) => handleClick(e, `/list/${tableNo}/${sessionId}`)}
                        className={({ isActive }) =>
                            `
    ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-300"}
    rounded-md transition
    ${loading ? "opacity-50 pointer-events-none" : ""}
    `
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
                        to={`/bill/${tableNo}/${sessionId}`}
                        onClick={(e) => handleClick(e, `/bill/${tableNo}/${sessionId}`)}
                        className={({ isActive }) =>
                            `
    ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-300"}
    rounded-md transition
    ${loading ? "opacity-50 pointer-events-none" : ""}
    `
                        }
                    >
                        Bill
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
