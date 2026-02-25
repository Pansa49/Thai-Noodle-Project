export function SelectRolePage() {
    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-10">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">

                <button
                    className="aspect-square bg-white rounded-2xl shadow-xl 
                 flex items-center justify-center 
                 text-2xl font-semibold
                 transition-all duration-300
                 hover:scale-105 hover:shadow-2xl
                 active:scale-95"
                >
                    Manager
                </button>

                <button
                    className="aspect-square bg-white rounded-2xl shadow-xl 
                 flex items-center justify-center 
                 text-2xl font-semibold
                 transition-all duration-300
                 hover:scale-105 hover:shadow-2xl
                 active:scale-95"
                >
                    Cashier
                </button>

                <button
                    className="aspect-square bg-white rounded-2xl shadow-xl 
                 flex items-center justify-center 
                 text-2xl font-semibold
                 transition-all duration-300
                 hover:scale-105 hover:shadow-2xl
                 active:scale-95"
                >
                    Waiter
                </button>

                <button
                    className="aspect-square bg-white rounded-2xl shadow-xl 
                 flex items-center justify-center 
                 text-2xl font-semibold
                 transition-all duration-300
                 hover:scale-105 hover:shadow-2xl
                 active:scale-95"
                >
                    Part Time
                </button>
            </div>

        </div>

    );
}
