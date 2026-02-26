import { useNavigate } from "react-router-dom";
import { timeLog } from "../api/fetchData";
import { useUserContext } from "../hook/use-user-context";

export function RolePage() {
    const navigate = useNavigate();
    const { id, username } = useUserContext();

    const handleClick = async (role: string) => {
        try {
            const timelog = await timeLog(id, username, role);
            console.log("timelog", timelog);
            navigate(`/role/${role}`);
        }
        catch (logErr) {
            console.error("TimeLog error:", logErr);
        }

    }

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
                    onClick={() => handleClick("manager")}
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
                    onClick={() => handleClick("cashier")}
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
                    onClick={() => handleClick("waiter")}
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
                    onClick={() => handleClick("part-time")}
                >
                    Part Time
                </button>
            </div>

        </div>

    );
}
