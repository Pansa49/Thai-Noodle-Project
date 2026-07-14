import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCartContext } from "../hook/use-cart-context";
import { getOrderSessionStatus } from "../../../shared/api/fetchData";


export function Header() {

    const { items } = useCartContext()
    const { tableNo, sessionId } = useParams<{ tableNo: string; sessionId: string }>();

    if (!tableNo || !sessionId) return null

    const navigate = useNavigate();

    useEffect(() => {
        async function checkStatus() {
            const session = await getOrderSessionStatus(tableNo!, sessionId!)

            if (!session) {
                navigate("/close");
                console.log(session + "session" + "ปิด session แล้ว")
            }
        }

        checkStatus() // เช็คครั้งแรกทันที

        const interval = setInterval(checkStatus, 5000) // เช็คทุก 5 วิ

        return () => clearInterval(interval) // 🔥 สำคัญมาก
    }, [tableNo, sessionId])

    return (
        <header
            id="header-container">
            <div id="header-top-container"
                className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between"
            >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Easy Order</span>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-extrabold flex items-center gap-1">
                    <span>📍</span> โต๊ะ {tableNo}
                </div>
            </div>

            <div id="header-bot-container"
                className="fixed bottom-0 w-full left-0 right-0 z-50 border-t border-slate-100 bg-black/95 backdrop-blur-md px-8 py-3 shadow-lg"
            >
                <nav className="flex justify-between text-sm md:text-base text-gray-600 font-medium">
                    <NavLink
                        to={`/menu/${tableNo}/${sessionId}`}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 py-1 px-3 transition-colors ${isActive
                                ? "bg-blue-500 text-white rounded-md relative cursor-pointer"
                                : "hover:bg-blue-300 rounded-md transition relative cursor-pointer"
                            }`
                        }
                    >
                        <span className="text-xl">📋</span>
                        เมนู
                    </NavLink>

                    <NavLink
                        to={`/list/${tableNo}/${sessionId}`}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 py-1 px-3 transition-colors ${isActive
                                ? "bg-blue-500 text-white rounded-md relative cursor-pointer"
                                : "hover:bg-blue-300 rounded-md transition relative cursor-pointer"
                            }`
                        }
                    >
                        <span className="text-xl">⏳</span>
                        รายการอาหาร
                        {items.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {items.length}
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to={`/bill/${tableNo}/${sessionId}`}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 py-1 px-3 transition-colors ${isActive
                                ? "bg-blue-500 text-white rounded-md relative cursor-pointer"
                                : "hover:bg-blue-300 rounded-md transition relative cursor-pointer"
                            }`
                        }
                    >
                        <span className="text-xl">💵</span>
                        เช็คบิล
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
