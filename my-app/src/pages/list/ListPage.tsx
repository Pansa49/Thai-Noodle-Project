import { ListOrder } from "../../components/ListOrder";
import { useCartContext } from "../../hook/use-cart-context";

export function ListPage() {

    const { items, addItemDb, clearItems } = useCartContext();

    return (
        <div className="container py-12 space-y-4">
            List Page
            <ListOrder />

            <button
                className="mt-4 w-full py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition"
                onClick={() => {
                    addItemDb(items);
                    clearItems();
                }}
            >
                ส่งรายการอาหาร
            </button>
        </div>
    );
}


