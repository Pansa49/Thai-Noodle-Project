import { useState, useEffect } from "react"
import { getTables, createTables, saveTablesLayout, deleteTables, createOrder, createSession, closeOrder, closeSession } from "../api/fetchData";

import { QRCodeSVG } from "qrcode.react";

interface Table {
    id: number;
    name: string;
    x: number;
    y: number;
    status?: "available" | "occupied";
}

interface Order {
    id: number;
    tableId: number;
    status: "ordering" | "paid";
    createdAt: string;
}

interface OrderSession {
    id: string;
    tableId: number;
    orderId: number;
    active: boolean;
}

export function SelectedTable() {
    const [tables, setTables] = useState<Table[]>([]);
    const [tableCount, setTableCount] = useState(2);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);

    const [tableSessions, setTableSessions] = useState<
        Record<number, { orderId: number; sessionId: string }>
    >({});

    useEffect(() => {
        loadTables();
    }, []);

    const loadTables = async () => {
        const data = await getTables();
        setTables(data);
    };

    const resetLayout = async () => {
        const data = await getTables();

        for (const table of data) {
            await deleteTables(table.id);
        }

        setTables([]);
    };

    const generateTables = async () => {
        const oldTables = await getTables();
        setTables([]);
        await Promise.all(oldTables.map((table: Table) => deleteTables(table.id.toString())));

        const newTables: Table[] = [];

        for (let i = 0; i < tableCount; i++) {
            newTables.push({
                id: i + 1,
                name: `${i + 1}`,
                x: 0,
                y: 0,
                status: "available",
            });
        }
        setTables(newTables);
        await createTables(newTables);
    }

    const getTableQR = (sessionId: string, tableId: number) => {
        // const VERCEL_URL = "https://thai-noodle-project-customer.vercel.app";
        const BASE_URL = "http://localhost:5173"

        const FINAL_Url = `${BASE_URL}/menu/${tableId}/${sessionId}`
        console.log(FINAL_Url)
        return FINAL_Url;
    };

    const handleReservation = async () => {
        if (!selectedTable) return;

        const updated: Table = {
            ...selectedTable,
            status: "occupied"
        };

        setTables((prev) =>
            prev.map((t) =>
                t.id === selectedTable.id ? updated : t
            )
        );

        await saveTablesLayout([updated]);

        const order: Order = await createOrder({
            tableId: selectedTable.id

        });

        const session: OrderSession = await createSession({
            tableId: selectedTable.id,
            orderId: order.id
        });

        setTableSessions((prev) => ({
            ...prev,
            [selectedTable.id]: {
                orderId: order.id,
                sessionId: session.id
            }
        }));
        setSelectedTable(updated);
    };

    const handlePay = async () => {
        if (!selectedTable) return;

        const sessionData = tableSessions[selectedTable.id];

        if (!selectedTable || !sessionData) return;

        await closeOrder(sessionData.orderId);
        await closeSession(sessionData.sessionId);

        const updated: Table = {
            ...selectedTable,
            status: "available"
        };

        setTables((prev) =>
            prev.map((t) =>
                t.id === selectedTable.id ? updated : t
            )
        );

        await saveTablesLayout([updated]);

        setTableSessions((prev) => {
            const newSessions = { ...prev };
            delete newSessions[selectedTable.id];
            return newSessions;
        });
        setSelectedTable(null);
    };

    return (
        <div id="selecttable-container"
            className="flex flex-1 flex-col space-y-6 overflow-hidden p-6 md:p-8">

            <h1 className="text-2xl font-bold text-slate-800">จัดผังโต๊ะ</h1>
            <p className="mt-1 text-sm text-slate-500">กำหนดจำนวนโต๊ะและสถานะภายในร้าน</p>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-2">
                <input
                    type="number"
                    min={1}
                    max={25}
                    value={tableCount}
                    onChange={(e) => setTableCount(Number(e.target.value))}
                    className="w-24 rounded-xl border border-slate-200 px-4 py-2 text-center font-semibold text-slate-700 transition outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />

                <button
                    onClick={generateTables}
                    className="rounded-xl bg-emerald-500 px-5 py-2 font-medium text-white shadow-sm shadow-emerald-200 transition duration-200 hover:bg-emerald-600 active:scale-95"
                >
                    สร้างโต๊ะ
                </button>

                <button
                    onClick={resetLayout}
                    className="rounded-xl bg-rose-100 px-4 py-2 font-medium text-slate-700 transition duration-200 hover:bg-rose-200 active:scale-95"
                >
                    Reset
                </button>
            </div>

            <div
                id="table-container"
                className="grid flex-1 grid-cols-2 content-start gap-5 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-inner sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full h-[75vh] mx-auto"
            >
                {tables.map((table) =>
                (
                    <StaticTable
                        key={table.id}
                        table={table}
                        onSelect={() => setSelectedTable(table)}
                    />
                )
                )}
            </div>

            {selectedTable && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setSelectedTable(null)}
                >
                    <div className="relative bg-white rounded-xl p-6 w-80 shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {selectedTable.status === "occupied"
                                ? `โต๊ะ ${selectedTable.name} ถูกจองแล้ว`
                                : `ยืนยันการจองโต๊ะ ${selectedTable.name}`}
                        </h2>

                        {selectedTable.status === "occupied" &&
                            tableSessions[selectedTable.id]?.sessionId && (
                                <div className="flex flex-col items-center mb-4">
                                    <QRCodeSVG
                                        value={getTableQR(tableSessions[selectedTable.id].sessionId, selectedTable.id)}
                                        size={180}
                                    />

                                    <p className="mt-3 text-lg font-bold">
                                        โต๊ะ {selectedTable.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        สแกนเพื่อสั่งอาหาร
                                    </p>
                                </div>
                            )}

                        <div className="flex justify-center-safe gap-3">

                            {/* ถ้าโต๊ะถูกจองแล้ว → แสดง ปุ่มปิด ปุ่มยกเลิกการจอง*/}
                            {selectedTable.status === "occupied" ? (
                                <>

                                    <button
                                        onClick={() => setSelectedTable(null)}
                                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                    >
                                        ✕
                                    </button>

                                    <button
                                        onClick={handlePay}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                    >
                                        ปิดโต๊ะ / จ่ายเงิน
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* ถ้ายังไม่จอง → แสดง ปุ่มปิด ปุ่มจองโต๊ะ*/}
                                    <button
                                        onClick={() => setSelectedTable(null)}
                                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                    >
                                        ✕
                                    </button>

                                    <button
                                        onClick={handleReservation}
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
        </div>
    );
}

function StaticTable({ table, onSelect }: { table: Table; onSelect: () => void }) {
    return (
        <div
            onClick={onSelect}
            className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center
            text-white font-semibold shadow-lg select-none p-4
            transition-all duration-200 cursor-pointer
            ${table.status === "occupied"
                    ? "bg-red-500 hover:bg-red-600 scale-[0.98]"
                    : "bg-green-500 hover:bg-green-600 hover:scale-[1.02]"
                }`}
        >
            <span className="mb-1 text-3xl drop-shadow-sm">🍽️</span>
            <div className="text-xl tracking-wide drop-shadow-sm">โต๊ะ {table.name}</div>
        </div>
    );
}