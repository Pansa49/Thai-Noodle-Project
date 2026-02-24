import { useState } from "react";


interface Table {
    id: number;
    name: string;
    seats: number;
    status: "available" | "occupied";
}

const mockTables: Table[] = [
    { id: 1, name: "A1", seats: 2, status: "available" },
    { id: 2, name: "A2", seats: 4, status: "occupied" },
    { id: 3, name: "B1", seats: 6, status: "available" },
    { id: 4, name: "B2", seats: 4, status: "available" },
    { id: 5, name: "VIP1", seats: 8, status: "occupied" },
];

export function SelectedTablePage() {
    const [tables, setTables] = useState<Table[]>(mockTables);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);

    function handleSelect(table: Table) {
        if (table.status === "occupied") return;
        setSelectedTable(table);
    }

    function handleConfirm() {
        if (!selectedTable) return;

        const updated: Table[] = tables.map((t) =>
            t.id === selectedTable.id
                ? { ...t, status: "occupied" }
                : t
        );

        setTables(updated);
        setSelectedTable(null);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">
                เลือกที่นั่งให้ลูกค้า
            </h1>

            {/* GRID โต๊ะ */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tables.map((table) => {
                    const isSelected = selectedTable?.id === table.id;

                    return (
                        <button
                            key={table.id}
                            onClick={() => handleSelect(table)}
                            className={`
                p-6 rounded-2xl shadow-lg text-white font-semibold
                transition transform hover:scale-105
                ${table.status === "occupied" && "bg-red-500 cursor-not-allowed"}
                ${table.status === "available" && !isSelected && "bg-green-500"}
                ${isSelected && "bg-yellow-500"}
              `}
                        >
                            <div className="text-xl">โต๊ะ {table.name}</div>
                            <div className="text-sm mt-2">
                                {table.seats} ที่นั่ง
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* ปุ่มยืนยัน */}
            {selectedTable && (
                <div className="fixed bottom-6 right-6">
                    <button
                        onClick={handleConfirm}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-xl"
                    >
                        ยืนยันเลือกโต๊ะ {selectedTable.name}
                    </button>
                </div>
            )}
        </div>
    );
}