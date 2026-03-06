import { useState, useEffect } from "react";
import type { Menu } from "../../../shared/menuDetail";
import { useCartContext } from "../hook/use-cart-context";
import { noodleMap, meatMap, vegetableMap } from "../../../shared/menuMapper"

type Props = {
    id: string | null;
    isOpen: boolean;
    menu: Menu | null;
    onClose: () => void;
};

export function PopUp({ menu, isOpen, onClose, id }: Props) {
    const [selectedNoodle, setSelectedNoodle] = useState<number | null>(null);
    const [selectedMeat, setSelectedMeat] = useState<number[]>([]);
    const [selectedVegetable, setSelectedVegetable] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!isOpen) {
            setSelectedNoodle(null);
            setSelectedMeat([]);
            setSelectedVegetable(null);
            setQuantity(1);
        }
    }, [isOpen]);

    const { saveItem, updateItem } = useCartContext();

    const isInvalid = selectedNoodle === null || selectedVegetable === null || selectedMeat.length === 0;

    const genIdByLocalDate = () => {
        const d = new Date();

        return (
            d.getFullYear() +
            String(d.getMonth() + 1).padStart(2, "0") +
            String(d.getDate()).padStart(2, "0") +
            String(d.getHours()).padStart(2, "0") +
            String(d.getMinutes()).padStart(2, "0") +
            String(d.getMilliseconds()).padStart(3, "0")
        );
    }
    if (!menu || !isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            onClick={onClose}   // backdrop click
        >
            <div
                className="bg-white rounded-2xl p-6 w-96 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // กัน click หลุดไป backdrop
            >
                <h2 className="text-xl font-bold mb-1">{menu.name}</h2>

                <p className="text-gray-500 mb-4">ราคา 20 บาท</p>

                {/* เลือกเส้น */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">เลือกเส้น</h3>
                    <div className="space-y-2">
                        {menu.noodleIds.map((n) => (
                            <label
                                key={n}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="noodle"
                                    checked={selectedNoodle === n}
                                    onChange={() => setSelectedNoodle(n)}
                                />

                                <span>{noodleMap.get(n)?.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* เลือกเครื่อง (เลือกได้หลายอย่าง) */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">เลือกเครื่อง (มากกว่า 1 อย่าง)</h3>
                    <div className="space-y-2">
                        {menu.meatIds.map((m) => (
                            <label
                                key={m}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedMeat.includes(m)}
                                    onChange={() =>
                                        setSelectedMeat((prev) =>
                                            prev.includes(m)
                                                ? prev.filter((id) => id !== m)
                                                : [...prev, m]
                                        )
                                    }
                                />
                                {<span>{meatMap.get(m)?.name}</span>}

                            </label>
                        ))}
                    </div>
                </div>

                {/* เลือกผัก */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">ผัก</h3>
                    <div className="space-y-2">
                        {menu.vegetableIds.map((v) => (
                            <label
                                key={v}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="vegetable"
                                    checked={selectedVegetable === v}
                                    onChange={() => setSelectedVegetable(v)}
                                />
                                {<span>{vegetableMap.get(v)?.name}</span>}
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
                    disabled={isInvalid}
                    className={`w-full py-2 rounded-xl text-white    ${isInvalid ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"}  `}
                    onClick={() => {
                        // ส่งข้อมูลไป bd.json
                        if (
                            selectedNoodle === null ||
                            selectedVegetable === null
                        ) {
                            alert("กรุณาเลือกเส้นและผักก่อน");
                            return;
                        }

                        if (id) {
                            updateItem({
                                id: id,
                                soup: menu.name,
                                noodle: selectedNoodle,
                                meat: selectedMeat,
                                vegetable: selectedVegetable,
                                quantity,
                                price: menu.price,
                            })
                        }
                        else {
                            saveItem({
                                id: genIdByLocalDate(),
                                soup: menu.name,
                                noodle: selectedNoodle,
                                meat: selectedMeat,
                                vegetable: selectedVegetable,
                                quantity,
                                price: menu.price,
                            });
                        }

                        onClose();
                    }}
                >
                    ยืนยัน ({quantity * menu.price} บาท)
                </button>
            </div>
        </div>
    );
}
