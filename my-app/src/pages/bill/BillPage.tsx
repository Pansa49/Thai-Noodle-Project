import { useLoaderData } from "react-router-dom";
import { type CartItem, meatMap, noodleMap, vegetableMap } from "../../api/menuDetail";

export function BillPage() {
    const orders = useLoaderData() as CartItem[]
    const subTotal = orders.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    )

    const vat = subTotal * 0.07
    const total = subTotal + vat

    if (orders.length === 0) {
        return (
            <p className="text-gray-500 text-center py-12">
                ยังไม่มีรายการสั่งซื้อ
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center py-10">

            {/* Receipt Paper */}
            <div className="w-[600px] bg-white shadow-lg rounded-lg p-6 font-mono text-sm">

                {/* Store Header */}
                <div className="text-center border-b border-dashed pb-4">
                    <h1 className="text-lg font-bold tracking-wider">NOODLE SHOP</h1>
                    <p className="text-xs text-gray-500">Bangkok Thailand</p>
                    <p className="text-xs text-gray-500">
                        {new Date().toLocaleString()}
                    </p>
                    <p className="text-xs mt-1">BILL NO: #{Math.floor(Math.random() * 99999)}</p>
                </div>

                {/* Items Header */}
                <div className="flex justify-between mt-4 text-gray-500">
                    <span>รายการ</span>
                    <span>รวม</span>
                </div>

                <div className="border-b border-dashed my-2" />

                {/* Items */}
                <div className="space-y-3">
                    {orders.map((item) => (
                        <div key={item.id}>
                            {/* Name */}
                            <p className="text-gray-800">
                                {item.soup}-
                                {noodleMap.get(item.noodle)?.name}-
                                {item.meat.map(m => meatMap.get(m)?.name).join("-")}-
                                {vegetableMap.get(item.vegetable)?.name}
                            </p>

                            {/* Qty + Price */}
                            <div className="flex justify-between text-gray-600 text-xs">
                                <span>
                                    {item.quantity} x {item.price} ฿
                                </span>
                                <span>
                                    {(item.quantity * item.price).toFixed(2)} ฿
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-b border-dashed my-4" />

                {/* Total */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>SUBTOTAL</span>
                        <span>{subTotal.toFixed(2)} ฿</span>
                    </div>

                    <div className="flex justify-between">
                        <span>VAT 7%</span>
                        <span>{vat.toFixed(2)} ฿</span>
                    </div>

                    <div className="border-t border-dashed pt-2 flex justify-between font-bold text-base">
                        <span>TOTAL</span>
                        <span>{total.toFixed(2)} ฿</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-dashed mt-6 pt-4 text-center text-xs text-gray-500 space-y-1">
                    <p>ขอบคุณที่ใช้บริการ</p>
                    <p>THANK YOU</p>
                </div>

                {/* Pay Button */}
                <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 active:scale-95 transition">
                    PAY NOW
                </button>

            </div>
        </div>

    );
}
