import { useState } from "react"
import db from "../../../db.json"
import type { Soup } from "../../api/menuDetail";


export function MenuPage() {

    const [openPopup, setOpenPopup] = useState(false);
    const [selectedSoup, setSelectedSoup] = useState<Soup | null>(null);

    const [selectedNoodle, setSelectedNoodle] = useState<number | null>(null);
    const [selectedMeat, setSelectedMeat] = useState<number[]>([]);
    const [selectedVegetable, setSelectedVegetable] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);


    const PopUp = () => {
        if (!openPopup || !selectedSoup) return null;

        return (
            <div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                onClick={() => setOpenPopup(false)}
            >
                <div
                    className="bg-white rounded-2xl p-6 w-96 max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold mb-1">
                        {selectedSoup.name}
                    </h2>

                    <p className="text-gray-500 mb-4">ราคา 20 บาท</p>

                    {/* เลือกเส้น */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">เลือกเส้น</h3>
                        <div className="space-y-2">
                            {selectedSoup.noodleIds.map((n) => (
                                <label
                                    key={n.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="noodle"
                                        checked={selectedNoodle === n.id}
                                        onChange={() => setSelectedNoodle(n.id)}
                                    />
                                    <span>{n.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* เลือกเครื่อง (เลือกได้หลายอย่าง) */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">เลือกเครื่อง (มากกว่า 1 อย่าง)</h3>
                        <div className="space-y-2">
                            {selectedSoup.meatIds.map((m) => (
                                <label
                                    key={m.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedMeat.includes(m.id)}
                                        onChange={() =>
                                            setSelectedMeat((prev) =>
                                                prev.includes(m.id)
                                                    ? prev.filter((id) => id !== m.id)
                                                    : [...prev, m.id]
                                            )
                                        }
                                    />
                                    <span>{m.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* เลือกผัก */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">ผัก</h3>
                        <div className="space-y-2">
                            {selectedSoup.vegetableIds.map((v) => (
                                <label
                                    key={v.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="vegetable"
                                        checked={selectedVegetable === v.id}
                                        onChange={() => setSelectedVegetable(v.id)}
                                    />
                                    <span>{v.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/*ปุ่มเพิ่มจำนวน*/}
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold">จำนวนจาน</span>

                        <div className="flex items-center gap-3">
                            <button
                                className="w-8 h-8 rounded-full bg-gray-200 text-lg"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                −
                            </button>

                            <span className="w-6 text-center">{quantity}</span>

                            <button
                                className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>


                    {/*ปุ่มเพิ่มรายการอาหาร*/}
                    <button
                        className="w-full py-2 rounded-xl bg-blue-500 text-white"
                        onClick={() => {
                            console.log({
                                soup: selectedSoup.name,
                                noodle: selectedNoodle,
                                meat: selectedMeat,
                                vegetable: selectedVegetable,
                                quantity,
                                totalPrice: quantity * selectedSoup.price,
                            });
                            setOpenPopup(false);
                        }}
                    >
                        ยืนยัน ({quantity * selectedSoup.price} บาท)
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


