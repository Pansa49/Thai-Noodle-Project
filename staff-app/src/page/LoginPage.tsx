import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/fetchData";
import { useUserContext } from "../hook/use-user-context";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { updateData } = useUserContext();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            if (!email || !password) {
                setError("กรุณากรอก Email และ Password");
                return;
            }

            const user = await getUser(email, password);

            if (!user) {
                setError("Email หรือ Password ไม่ถูกต้อง");
                return;
            }

            localStorage.setItem("user", JSON.stringify(user));

            setError("");
            updateData(user.id, user.name);
            console.log("Login success", user);

            navigate("/role");
        }
        catch (err) {
            console.log("LOGIN ERROR:", err);
            setError("เกิดข้อผิดพลาด");
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    เข้าสู่ระบบ
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    ลืมรหัสผ่าน?
                </p>

            </div>
        </div>

    );
}