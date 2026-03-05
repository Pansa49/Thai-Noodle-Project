import {
    DndContext,
    useDraggable,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Table {
    id: number;
    name: string;
    x: number;
    y: number;
    status?: "available" | "reserved";
}

const PADDING = 20;
const GRID_SIZE = 20;
const tableSize = window.innerWidth < 768 ? 70 : 100;

export function SelectedTable() {
    const [tables, setTables] = useState<Table[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [tableCount, setTableCount] = useState(2);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);

    const [qrValue, setQrValue] = useState("");
    const [showQR, setShowQR] = useState(false);

    const generateTables = () => {
        const container = document.getElementById("table-container");
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const newTables: Table[] = [];

        const tableSize = width < 768 ? 70 : 100;
        const GAP = 14;

        const usableWidth = width - PADDING * 2;
        const perRow = Math.floor(usableWidth / (tableSize + GAP));

        for (let i = 0; i < tableCount; i++) {
            const row = Math.floor(i / perRow);
            const col = i % perRow;

            const x = PADDING + col * (tableSize + GAP);
            const y = PADDING + row * (tableSize + GAP);

            if (y > height - tableSize - PADDING) break;

            newTables.push({
                id: i + 1,
                name: `${i + 1}`,
                x,
                y,
                status: "available",
            });
        }

        setTables(newTables);
    }

    const generateQRCode = (tableNo: number) => {
        const BASE_URL = "https://thai-noodle-lab-customer-db-production.up.railway.app"
        const url = `${BASE_URL}/menu/${tableNo}`;
        setQrValue(url);
        setShowQR(true);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        if (!isEditMode) return;

        const { active, delta } = event;

        const container = document.getElementById("table-container");
        if (!container) return;

        const rect = container.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        setTables((prev) =>
            prev.map((table) => {
                if (table.id !== active.id) return table;

                let newX = table.x + delta.x;
                let newY = table.y + delta.y;
                // ✅ SNAP TO GRID
                newX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
                newY = Math.round(newY / GRID_SIZE) * GRID_SIZE;

                // ✅ กันเลยขอบ + เว้น padding
                const clampedX = Math.max(
                    PADDING,
                    Math.min(newX, width - tableSize - PADDING)
                );

                const clampedY = Math.max(
                    PADDING,
                    Math.min(newY, height - tableSize - PADDING)
                );

                return { ...table, x: clampedX, y: clampedY };
            })
        );
    }

    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">จัดผังโต๊ะ</h1>

            {/* 🔥 ช่องกรอกจำนวนโต๊ะ */}
            <div className="flex gap-4 items-center">
                <input
                    type="number"
                    min={1}
                    max={25}
                    value={tableCount}
                    onChange={(e) => setTableCount(Number(e.target.value))}
                    className="border px-4 py-2 rounded-lg w-15"
                />

                <button
                    onClick={generateTables}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                    สร้างโต๊ะ
                </button>

                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`px-5 py-2 rounded-lg text-white ${isEditMode ? "bg-red-500" : "bg-blue-600"}`}
                >
                    {isEditMode ? "เสร็จสิ้น" : "แก้ไขตำแหน่ง"}
                </button>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div
                    id="table-container"
                    className="relative border-2 rounded-xl bg-gray-100 w-full max-w-5xl h-[75vh] mx-auto"
                >
                    {isEditMode && (
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage: `
                            repeating-linear-gradient(
                                to right,
                                rgba(0,0,0,0.25) 0px,
                                rgba(0,0,0,0.25) 1px,
                                transparent 1px,
                                transparent 20px
                            ),
                            repeating-linear-gradient(
                                to bottom,
                                rgba(0,0,0,0.25) 0px,
                                rgba(0,0,0,0.25) 1px,
                                transparent 1px,
                                transparent 20px
                            )
                        `
                                }}
                            />
                        </div>
                    )}
                    {tables.map((table) => (
                        <DraggableTable
                            key={table.id}
                            table={table}
                            isEditMode={isEditMode}
                            onSelect={() => {
                                if (!isEditMode) {
                                    setSelectedTable(table);
                                }
                            }}
                        />
                    ))}
                </div>
            </DndContext>

            {selectedTable && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setSelectedTable(null)}
                >
                    <div className="bg-white rounded-xl p-6 w-80 shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {selectedTable.status === "reserved"
                                ? `โต๊ะ ${selectedTable.name} ถูกจองแล้ว`
                                : `ยืนยันการจองโต๊ะ ${selectedTable.name}`}
                        </h2>

                        <div className="flex justify-end gap-3">

                            {/* ถ้าโต๊ะถูกจองแล้ว → แสดง ปุ่มปิด ปุ่มยกเลิกการจอง*/}
                            {selectedTable.status === "reserved" ? (
                                <>

                                    <button
                                        onClick={() => setSelectedTable(null)}
                                        className="px-4 py-2 bg-gray-300 rounded-lg"
                                    >
                                        ปิด
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTables((prev) =>
                                                prev.map((t) =>
                                                    t.id === selectedTable.id
                                                        ? { ...t, status: "available" }
                                                        : t
                                                )
                                            );
                                            setSelectedTable(null);
                                        }}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    >
                                        ยกเลิกการจอง
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* ถ้ายังไม่จอง → แสดง ปุ่มปิด ปุ่มจองโต๊ะ*/}
                                    <button
                                        onClick={() => setSelectedTable(null)}
                                        className="px-4 py-2 bg-gray-300 rounded-lg"
                                    >
                                        ปิด
                                    </button>

                                    <button
                                        onClick={() => {
                                            generateQRCode(selectedTable.id)


                                            setTables((prev) =>
                                                prev.map((t) =>
                                                    t.id === selectedTable.id
                                                        ? { ...t, status: "reserved" }
                                                        : t
                                                )
                                            );
                                            setSelectedTable(null);
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                    >
                                        จองโต๊ะ
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showQR && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setShowQR(false)}
                >
                    <div
                        className="bg-white rounded-xl p-6 w-80 shadow-xl text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            QR Code โต๊ะ {qrValue.split("/").pop()}
                        </h2>

                        <div className="flex justify-center mb-4">
                            <QRCodeSVG value={qrValue} size={200} />
                        </div>

                        <button
                            onClick={() => setShowQR(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function DraggableTable({ table, isEditMode, onSelect, }: { table: Table; isEditMode: boolean; onSelect: () => void; }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: table.id,
        disabled: !isEditMode,
    });

    const style = {
        position: "absolute" as const,
        left: table.x,
        top: table.y,
        transform: CSS.Translate.toString(transform),
        width: tableSize,
        height: tableSize,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={onSelect}
            className={`rounded-xl flex flex-col items-center justify-center
text-white font-semibold shadow-lg select-none
border-2 border-black transition-colors duration-200
${isEditMode
                    ? "bg-yellow-500 cursor-grab"
                    : table.status === "reserved"
                        ? "bg-red-500 cursor-not-allowed"
                        : "bg-green-500 hover:bg-blue-500 cursor-pointer"
                }`}
        >
            <div>{table.name}</div>
        </div>
    );
}