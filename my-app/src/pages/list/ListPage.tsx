import db from "../../database/db.json";

export function ListPage() {
    return (
        <div className="container py-12 space-y-4">
            {db.orders.map((order) => (
                <div
                    key={order.id}
                    className="border rounded-lg p-4"
                >
                    <p className="font-bold">{order.soup}
                        {order.noodle}
                        {order.meat.map((m, i) => (
                            <span key={i}>{m}</span>
                        ))}</p>
                    <p className="text-gray-600">{order.totalPrice} บาท</p>
                </div>
            ))}
        </div>
    );
}
