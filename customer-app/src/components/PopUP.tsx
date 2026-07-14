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
        <div id="popup-container"
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end justify-center transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="animate-slide-up pb-safe flex max-h-[85vh] w-full max-w-9/10 flex-col justify-between overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // กัน click หลุดไป backdrop
            >
                <div>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-200"></div>

                    <div className="mb-5 flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-950">{menu.name}</h2>
                            <p className="mt-0.5 text-xs font-semibold text-blue-600">20 บาท</p>
                        </div>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-300 text-red-800 transition-transform active:scale-90"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>

                    {/* เลือกเส้น */}
                    <div className="mb-5 border-b border-slate-50 pb-5">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">เลือกเส้น</h3>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">จำเป็นต้องเลือก</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {menu.noodleIds.map((n) => (
                                <label
                                    key={n}
                                    className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3 transition-all active:scale-98 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/30"
                                >
                                    <span>{noodleMap.get(n)?.name}</span>
                                    <input
                                        type="radio"
                                        name="noodle"
                                        className="h-4 w-4 accent-blue-600"
                                        checked={selectedNoodle === n}
                                        onChange={() => setSelectedNoodle(n)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* เลือกเครื่อง (เลือกได้หลายอย่าง) */}
                    <div className="mb-5 border-b border-slate-50 pb-5">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-800">เลือกเครื่อง</h3>
                            <span className="text-[10px] font-medium text-slate-400">เลือกได้มากกว่า 1 อย่าง</span>
                        </div>

                        <div className="space-y-2">
                            {menu.meatIds.map((m) => (
                                <label
                                    key={m}
                                    className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all active:scale-99 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/30"
                                >
                                    {<span>{meatMap.get(m)?.name}</span>}
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded text-blue-600 accent-blue-600"
                                        checked={selectedMeat.includes(m)}
                                        onChange={() =>
                                            setSelectedMeat((prev) =>
                                                prev.includes(m)
                                                    ? prev.filter((id) => id !== m)
                                                    : [...prev, m]
                                            )
                                        }
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* เลือกผัก */}
                    <div className="mb-6">
                        <h3 className="mb-3 text-sm font-bold text-slate-800">ผัก</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {menu.vegetableIds.map((v) => (
                                <label
                                    key={v}
                                    className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/30"
                                >
                                    <span className="text-xs font-medium text-slate-700">{vegetableMap.get(v)?.name}</span>
                                    <input
                                        type="radio"
                                        name="vegetable"
                                        className="h-4 w-4 accent-blue-600"
                                        checked={selectedVegetable === v}
                                        onChange={() => setSelectedVegetable(v)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/*ปุ่มเพิ่มจำนวน*/}
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">จำนวนจาน</span>

                        <div className="flex items-center gap-4 rounded-full bg-slate-100 p-1">
                            <button
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-slate-800 shadow-sm transition-transform active:scale-90"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                −
                            </button>

                            <span className="w-4 text-center text-sm font-bold text-slate-900">{quantity}</span>

                            <button
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 font-bold text-white shadow-sm transition-transform active:scale-90"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/*ปุ่มเพิ่มรายการอาหาร*/}
                    <button
                        disabled={isInvalid}
                        className={`w-full rounded-2xl py-3.5 text-sm font-bold text-white shadow-md transition-all ${isInvalid
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-slate-900 hover:bg-slate-800 active:scale-95"
                            }`}
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
                    </button></div>
            </div>
        </div>
    );
}
