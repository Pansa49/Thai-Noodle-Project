import { NavLink } from "react-router-dom";
import { useCartContext } from "../hook/use-cart-context";

export function Header() {

    const { items } = useCartContext()
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="text-xl font-bold text-blue-600 cursor-pointer">
                    MyShop
                </div>

                <nav className="flex gap-5 text-smmd:text-base md:gap-12text-gray-600 font-medium">

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

                    {/* Profile */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                        {/* <button
                            onClick={() => {
                                clearItems()
                            }}
                        >
                            👤
                        </button> */}

                        <NavLink
                            to="/login"
                        >
                            👤
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}
