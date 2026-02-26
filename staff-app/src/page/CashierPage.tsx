import {
    DndContext,
    useDraggable,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface Table {
    id: number;
    name: string;
    x: number;
    y: number;
}

const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 400;
const TABLE_SIZE = 0.1 * CONTAINER_WIDTH;
const PADDING = 20;
const GRID_SIZE = 20;

export function SelectedTable() {
    const [tables, setTables] = useState<Table[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [tableCount, setTableCount] = useState(2);

    function generateTables() {
        const newTables: Table[] = [];

        const GAP = 14; // ระยะห่างระหว่างโต๊ะ
        const usableWidth =
            CONTAINER_WIDTH - PADDING * 2;

        // คำนวณว่าหนึ่งแถววางได้กี่โต๊ะ
        const perRow = Math.floor(
            usableWidth / (TABLE_SIZE + GAP)
        );

        for (let i = 0; i < tableCount; i++) {
            const row = Math.floor(i / perRow);
            const col = i % perRow;

            const x =
                PADDING + col * (TABLE_SIZE + GAP);

            const y =
                PADDING + row * (TABLE_SIZE + GAP);
            if (
                y > CONTAINER_HEIGHT - TABLE_SIZE - PADDING
            ) {
                break;
            }
            newTables.push({
                id: i + 1,
                name: `${i + 1}`,
                x,
                y,
            });
        }

        setTables(newTables);
    }

    function handleDragEnd(event: DragEndEvent) {
        if (!isEditMode) return;

        const { active, delta } = event;

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
                    Math.min(newX, CONTAINER_WIDTH - TABLE_SIZE - PADDING)
                );

                const clampedY = Math.max(
                    PADDING,
                    Math.min(newY, CONTAINER_HEIGHT - TABLE_SIZE - PADDING)
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
                    className="border px-4 py-2 rounded-lg w-24"
                />

                <button
                    onClick={generateTables}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                    สร้างโต๊ะ
                </button>

                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`px-6 py-2 rounded-lg text-white
          ${isEditMode ? "bg-red-500" : "bg-blue-600"}`}
                >
                    {isEditMode ? "เสร็จสิ้น" : "แก้ไขตำแหน่ง"}
                </button>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div
                    className="relative border-2 rounded-xl bg-gray-100 overflow-hidden"
                    style={{
                        width: CONTAINER_WIDTH,
                        height: CONTAINER_HEIGHT,
                    }}
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
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
}

function DraggableTable({
    table,
    isEditMode,
}: {
    table: Table;
    isEditMode: boolean;
}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: table.id,
        disabled: !isEditMode,
    });

    const style = {
        position: "absolute" as const,
        left: table.x,
        top: table.y,
        transform: CSS.Translate.toString(transform),
        width: TABLE_SIZE,
        height: TABLE_SIZE,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`rounded-xl flex flex-col items-center justify-center
text-white font-semibold shadow-lg select-none
border-2 border-black
${isEditMode ? "bg-yellow-500 cursor-grab" : "bg-green-500"}`}
        >
            <div>{table.name}</div>
        </div>
    );
}