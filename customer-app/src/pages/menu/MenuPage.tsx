import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { Menu } from "../../../../shared/menuDetail";
import { PopUp } from "../../components/PopUP";

export function MenuPage() {
    const menus = useLoaderData() as Menu[];

    const [openPopup, setOpenPopup] = useState(false);
    const [selectedSoup, setSelectedSoup] = useState<Menu | null>(null);

    return (
        <div
            id="menu-container"
            className="px-4 py-6 space-y-6">
            <div className="grid grid-cols-2 gap-3">
                {menus.map((menu) => (
                    <div
                        className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all active:scale-98"
                        key={menu.id}
                    >
                        <div className="aspect-square w-full bg-slate-50 rounded-xl flex items-center justify-center text-4xl mb-3">
                            🍜
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm">{menu.name}</h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">{menu.price} บาท</p>

                        <button
                            className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold transition-all hover:bg-slate-800 active:scale-95 transition"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSoup(menu);
                                setOpenPopup(true);
                            }}>
                            สั่ง
                        </button>
                    </div>
                ))}
            </div>


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


