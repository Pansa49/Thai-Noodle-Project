import { useState } from "react";
import menudb from "../../database/menudb.json";
import type { Menu } from "../../api/menuDetail";
import { PopUp } from "../../components/PopUP";

export function MenuPage() {

    const [openPopup, setOpenPopup] = useState(false);

    const [selectedSoup, setSelectedSoup] = useState<Menu | null>(null);

    return (
        <div className="container py-12 space-y-8">
            <h1>MenuPage</h1>
            {menudb.Menus.map((menu) => (
                <div
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5"
                    key={menu.id}
                >

                    <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center text-4xl mb-4">
                        🍜
                    </div>

                    <h3 className="text-lg font-semibold">{menu.name}</h3>
                    <p className="text-gray-500">20 บาท</p>

                    <button
                        className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSoup(menu);
                            setOpenPopup(true);
                        }}>
                        สั่ง
                    </button>
                </div>
            ))}

            <PopUp
                id={null}
                isOpen={openPopup}
                menu={selectedSoup}
                onClose={() => {
                    setOpenPopup(false);
                    setSelectedSoup(null);
                }}
            />
        </div>
    )
}


