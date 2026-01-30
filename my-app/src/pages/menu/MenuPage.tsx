import { useState } from "react"
import db from "../../../db.json"
import type { Soup } from "../../api/menuDetail";


export function MenuPage() {

    const [openPopup, setOpenPopup] = useState(false);
    const [selectedSoup, setSelectedSoup] = useState<Soup | null>(null);

    const PopUp = () => {
        console.log(" openPopup = " + openPopup);
        console.log(" selectedSoup = " + selectedSoup);
        if (!openPopup || !selectedSoup) return null;


        return (
            <div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                onClick={() => setOpenPopup(false)}
            >
                <div
                    className="bg-white rounded-2xl p-6 w-80"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-2">
                        {selectedSoup.name}
                    </h2>

                    <p className="text-gray-500 mb-4">
                        ราคา 20 บาท
                    </p>

                    <button
                        className="w-full py-2 rounded-xl bg-blue-500 text-white"
                        onClick={() => setOpenPopup(false)}
                    >
                        ปิด
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="container py-12 space-y-8">
            <h1>MenuPage</h1>
            {db.soups.map((soup) => (
                <div
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5"
                    key={soup.id}
                    onClick={() => {
                        setSelectedSoup(soup);
                        setOpenPopup(true);
                    }}
                >

                    <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center text-4xl mb-4">
                        🍜
                    </div>

                    <h3 className="text-lg font-semibold">{soup.name}</h3>
                    <p className="text-gray-500">20 บาท</p>

                    <button className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition">
                        เพิ่ม
                    </button>
                </div>
            ))}
            <PopUp />
        </div>
    )
}


