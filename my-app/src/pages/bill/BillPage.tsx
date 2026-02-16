import billData from "../../database/db.json";
import { useLoaderData } from "react-router-dom";
import type { CartItem } from "../../api/menuDetail";

export function BillPage() {
    const orders = useLoaderData() as CartItem[]

    const totalPrice = 100;
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

                {/* Header */}
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    🧾 รายการบิล
                </h1>

                {/* Table Header */}
                <div className="grid grid-cols-4 border-b pb-3 text-gray-500 font-medium">
                    <p>รายการ</p>
                    <p className="text-center">จำนวน</p>
                    <p className="text-center">ราคา</p>
                    <p className="text-right">รวม</p>
                </div>

                {/* Order List */}
                <div className="divide-y">
                    {orders.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-4 py-4 items-center"
                        >
                            <p className="font-medium text-gray-700">
                                {item.soup}
                            </p>

                            <p className="text-center">{item.quantity}</p>

                            <p className="text-center">{item.totalPrice} ฿</p>

                            <p className="text-right font-semibold">
                                {item.totalPrice * item.quantity} ฿
                            </p>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
                    <span>รวมทั้งหมด</span>
                    <span className="text-blue-600">{totalPrice} ฿</span>
                </div>

                {/* Button */}
                <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 active:scale-95 transition">
                    ชำระเงิน
                </button>

            </div>
        </div>
    );
}
