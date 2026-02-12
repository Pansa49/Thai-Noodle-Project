import { useCartContext } from "../hook/use-cart-context";

export function ListOrder() {
    const { items } = useCartContext();

    if (items.length === 0) {
        return (
            <p className="text-gray-500 text-center py-12">
                ยังไม่มีรายการสั่งซื้อ
            </p>
        );
    }

    return (
        <div className="container py-12 space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="group border rounded-lg p-4 flex justify-between items-center transition hover:shadow-md"
                >
                    <div>
                        <p className="font-bold">
                            {item.soup}
                            {item.noodle}
                            {item.meat.map((m, i) => (
                                <span key={i}>{m} </span>
                            ))}
                        </p>

                        <p className="text-gray-600">{item.totalPrice} บาท</p>
                    </div>
                    <button
                        className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition duration-200 px-4 py-2 rounded-lg bg-red-300 text-white hover:bg-red-600"
                        onClick={() => console.log("edit")}
                    >
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
}
