import { useNavigate } from "react-router-dom";

export function StatusPage() {
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center space-y-4">
                <h1 className="text-2xl font-bold text-green-600">
                    Login Success 🎉
                </h1>

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}