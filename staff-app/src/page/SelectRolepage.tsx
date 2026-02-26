import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { timeLog } from "../api/fetchData";

export function SelectRolePage() {

    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //const timelog = await TimeLog(user.id, user.name,);
            console.log("Log");
        }
        catch (logErr) {
            console.error("TimeLog error:", logErr);
        }

        navigate("/status");

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
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onClick={handleClick}
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
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onClick={handleClick}
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
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onClick={handleClick}
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
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onClick={handleClick}
                >
                    Part Time
                </button>
            </div>

        </div>

    );
}
