export function Header() {
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="text-xl font-bold text-blue-600 cursor-pointer">
                    MyShop
                </div>

                {/* Menu */}
                <nav className="hidden md:flex gap-12 text-gray-600 font-medium">
                    <a href="#" className="hover:text-blue-600 transition">
                        Menu
                    </a>
                    <a href="#" className="hover:text-blue-600 transition">
                        List
                    </a>
                    <a href="#" className="hover:text-blue-600 transition">
                        Bill
                    </a>
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
                        👤
                    </div>
                </div>
            </div>
        </header>
    )
}
