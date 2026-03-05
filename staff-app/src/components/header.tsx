import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hook/use-user-context";

export function Header() {
    const navigate = useNavigate();

    const { username } = useUserContext();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };



    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

            {/* Logo / Title */}
            <h1 className="text-xl font-bold text-gray-800">
                Boat Noodle Lab
            </h1>

            {/* User Section */}
            <div className="flex items-center gap-4">
                {username ? (
                    <>
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="text-sm">👤</span>
                            <span className="font-medium">{username}</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <span className="text-gray-500 text-sm">
                        ยังไม่ได้เข้าสู่ระบบ
                    </span>
                )}
            </div>
        </header>
    );
}