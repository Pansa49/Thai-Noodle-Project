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
            {items.map((item, inddex) => (
                <div
                    key={inddex}
                    className="border rounded-lg p-4"
                >
                    <p className="font-bold">{item.soup}
                        {item.noodle}
                        {item.meat.map((m, i) => (
                            <span key={i}>{m} </span>
                        ))}
                    </p>
                    <p className="text-gray-600">{item.totalPrice} บาท</p>
                </div>
            ))}
        </div>
    );
}
