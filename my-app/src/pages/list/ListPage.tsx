import { useLoaderData } from "react-router-dom";
import { useCartContext } from "../../hook/use-cart-context";
import { useState } from "react";
import { PopUp } from "../../components/PopUP";
import { meatMap, type Menu, noodleMap, vegetableMap } from "../../api/menuDetail";

export function ListPage() {

    const menus = useLoaderData() as Menu[];

    const { items, addItemDb, clearItems, removeItem } = useCartContext();

    const [openPopup, setOpenPopup] = useState(false);
    const [selectedSoup, setSelectedSoup] = useState<Menu | null>(null);
    const [popupId, setPopupId] = useState<string>("");

    if (items.length === 0) {
        return (
            <p className="text-gray-500 text-center py-12">
                ยังไม่มีรายการสั่งซื้อ
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-800">
                    🧾 รายการอาหารของคุณ
                </h1>

                {/* List */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex justify-between items-center"
                        >
                            {/* Food Detail */}
                            <div className="space-y-1">

                                {/* Main Menu */}
                                <p className="text-lg font-semibold text-gray-800">
                                    {item.soup}
                                </p>

                                {/* Options */}
                                <div className="flex flex-wrap gap-x-3 text-sm text-gray-500">

                                    <span>
                                        🍜{noodleMap.get(item.noodle)?.name}
                                    </span>

                                    <span>
                                        🥩{item.meat.map(m => meatMap.get(m)?.name).join(", ")}
                                    </span>

                                    <span>
                                        🥬{vegetableMap.get(item.vegetable)?.name}
                                    </span>

                                    <span>
                                        🍽️{item.quantity} ชาม
                                    </span>

                                </div>

                            </div>

                            {/* Price + Action */}
                            <div className="text-right space-y-2">

                                <p className="text-xl font-bold text-blue-600">
                                    {item.price * item.quantity} ฿
                                </p>

                                <div className="flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">

                                    <button
                                        className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                                        onClick={() => {
                                            setOpenPopup(true);
                                            const menu = menus.find(
                                                (m) => m.name === item.soup
                                            );
                                            setSelectedSoup(menu ?? null);
                                            setPopupId(item.id);
                                        }}
                                    >
                                        แก้ไข
                                    </button>

                                    <button
                                        className="px-4 py-2 text-sm rounded-lg bg-red-400 text-white hover:bg-red-600 transition"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        ลบ
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Send Button Card */}
                <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

                    <div>
                        <p className="text-gray-500 text-sm">รวมทั้งหมด</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {items.reduce((sum, i) => sum + (i.price * i.quantity), 0)} ฿
                        </p>
                    </div>

                    <button
                        className="px-10 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 active:scale-95 transition"
                        onClick={() => {
                            addItemDb(items);
                            clearItems();
                        }}
                    >
                        ส่งรายการอาหาร
                    </button>

                </div>

                {/* Popup */}
                <PopUp
                    id={popupId}
                    isOpen={openPopup}
                    menu={selectedSoup}
                    onClose={() => {
                        setOpenPopup(false);
                        setSelectedSoup(null);
                    }}
                />

            </div>
        </div>

    );
}


