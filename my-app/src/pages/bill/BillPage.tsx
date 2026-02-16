import { useLoaderData } from "react-router-dom";
import type { CartItem } from "../../api/menuDetail";

export function BillPage() {
    const orders = useLoaderData() as CartItem[]

    const totalPrice = 100;
    // return (
    //     <div className="min-h-screen bg-gray-50 py-10 px-4">
    //         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

    //             {/* Header */}
    //             <h1 className="text-2xl font-bold mb-6 text-gray-800">
    //                 🧾 รายการบิล
    //             </h1>

    //             {/* Table Header */}
    //             <div className="grid grid-cols-4 border-b pb-3 text-gray-500 font-medium">
    //                 <p>รายการ</p>
    //                 <p className="text-center">จำนวน</p>
    //                 <p className="text-center">ราคา</p>
    //                 <p className="text-right">รวม</p>
    //             </div>

    //             {/* Order List */}
    //             <div className="divide-y">
    //                 {orders.map((item) => (
    //                     <div
    //                         key={item.id}
    //                         className="grid grid-cols-4 py-4 items-center"
    //                     >
    //                         <p className="font-medium text-gray-700">
    //                             {item.soup}
    //                         </p>

    //                         <p className="text-center">{item.quantity}</p>

    //                         <p className="text-center">{item.totalPrice} ฿</p>

    //                         <p className="text-right font-semibold">
    //                             {item.totalPrice * item.quantity} ฿
    //                         </p>
    //                     </div>
    //                 ))}
    //             </div>

    //             {/* Total */}
    //             <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
    //                 <span>รวมทั้งหมด</span>
    //                 <span className="text-blue-600">{totalPrice} ฿</span>
    //             </div>

    //             {/* Button */}
    //             <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 active:scale-95 transition">
    //                 ชำระเงิน
    //             </button>

    //         </div>
    //     </div>
    // );

    return (
        <div className="min-h-screen bg-gray-200 flex justify-center py-10">

            {/* Receipt Paper */}
            <div className="w-[340px] bg-white shadow-lg rounded-lg p-6 font-mono text-sm">

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
                            <p className="text-gray-800">{item.soup}</p>

                            {/* Qty + Price */}
                            <div className="flex justify-between text-gray-600 text-xs">
                                <span>
                                    {item.quantity} x {item.totalPrice} ฿
                                </span>
                                <span>
                                    {(item.quantity * item.totalPrice).toFixed(2)} ฿
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
                        <span>{totalPrice.toFixed(2)} ฿</span>
                    </div>

                    <div className="flex justify-between">
                        <span>VAT 7%</span>
                        <span>{(totalPrice * 0.07).toFixed(2)} ฿</span>
                    </div>

                    <div className="border-t border-dashed pt-2 flex justify-between font-bold text-base">
                        <span>TOTAL</span>
                        <span>{(totalPrice * 1.07).toFixed(2)} ฿</span>
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
