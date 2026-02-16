import { NavLink } from "react-router-dom";
import { useCartContext } from "../hook/use-cart-context";

export function Header() {

    const { clearItems } = useCartContext()
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="text-xl font-bold text-blue-600 cursor-pointer">
                    MyShop
                </div>

                {/* Menu */}
                <nav className="hidden md:flex gap-12 text-gray-600 font-medium">
                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white rounded-md"
                                : "hover:bg-blue-300 rounded-md transition"
                        }
                    >
                        Menu
                    </NavLink>

                    <NavLink
                        to="/list"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white rounded-md"
                                : "hover:bg-blue-300 rounded-md transition"
                        }
                    >
                        List
                    </NavLink>

                    <NavLink
                        to="/bill"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white rounded-md"
                                : "hover:bg-blue-300 rounded-md transition"
                        }
                    >
                        Bill
                    </NavLink>
                </nav>

                {/* Right action */}
                <div className="flex items-center gap-4">
                    {/* Cart */}
                    <div className="relative cursor-pointer">
                        <span className="text-gray-700">🧾</span>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            3
                        </span>
                    </div>

                    {/* Profile */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                        <button
                            onClick={() => {
                                clearItems()
                            }}
                        >
                            👤
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
