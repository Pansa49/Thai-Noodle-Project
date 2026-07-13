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
        <header id="header-container" className="z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl text-orange-600 shadow-sm">🍜</div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-800">Boat Noodle <span className="text-orange-500">Lab</span></h1>
            </div>
            <div className="flex items-center gap-4">
                {username ? (
                    <>
                        <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-slate-600">
                            <span className="text-sm">👤</span>
                            <span className="text-sm font-medium">Employee1</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-rose-100 px-4 py-2 text-sm font-medium text-rose-600 transition duration-200 hover:bg-rose-300 active:scale-95"
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