import { useLoaderData } from "react-router-dom";
import { useCartContext } from "../../hook/use-cart-context";
import { useState } from "react";
import { PopUp } from "../../components/PopUP";
import type { Menu } from "../../api/menuDetail";

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
        <div className="container py-12 space-y-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="group border rounded-lg p-4 flex justify-between items-center transition hover:shadow-md"
                >
                    <div>
                        <p className="font-bold">
                            {item.soup}
                            {item.noodle}
                            {item.meat.map((m, i) => (
                                <span key={i}>{m} </span>
                            ))}
                        </p>

                        <p className="text-gray-600">{item.totalPrice} บาท</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200 px-4 py-2 rounded-lg bg-red-300 text-white hover:bg-red-600"
                            onClick={() => {
                                setOpenPopup(true);
                                const menu = menus.find(
                                    (m) => m.name === item.soup
                                );
                                setSelectedSoup(menu ?? null);;
                                setPopupId(item.id)
                            }}
                        >
                            Edit
                        </button>

                        <button
                            className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200 px-4 py-2 rounded-lg bg-red-300 text-white hover:bg-red-600"
                            onClick={() => {
                                removeItem(item.id)
                            }}
                        >
                            remove
                        </button>
                    </div>

                </div>
            ))
            }
            <button
                className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition"
                onClick={() => {
                    addItemDb(items);
                    clearItems();
                }}
            >
                ส่งรายการอาหาร
            </button>

            <PopUp
                id={popupId}
                isOpen={openPopup}
                menu={selectedSoup}
                onClose={() => {
                    setOpenPopup(false);
                    setSelectedSoup(null);
                }}
            />
        </div >
    );
}


