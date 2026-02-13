import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

export type CartItem = {
    id: string;
    soup: string;
    noodle: number;
    meat: number[];
    vegetable: number;
    quantity: number;
    totalPrice: number;
};

type CartContextType = {
    id?: number;
    items: CartItem[];

    // about json
    addItemDb: (item: CartItem[]) => void;
    getItemDb: () => Promise<void>;
    deleteItemDb: (index: string) => void;

    // about state Item
    saveItem: (item: CartItem) => void;
    updateItem: (item: CartItem) => void;
    removeItem: (index: string) => void;
    clearItems: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {

    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        console.log(items)
    }, [items])

    const saveItem = (item: CartItem) => {
        setItems((prev) => [...prev, item]);
        console.log({
            save: item
        })
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
        console.log({
            remove: id
        })
    };

    const updateItem = (updatedItem: CartItem) => {
        setItems(prev =>
            prev.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const getItemDb = useCallback(async () => {
        const res = await axios.get("http://localhost:3001/orders")
        setItems(res.data);
    }, []);

    const addItemDb = async (orders: CartItem[]) => {
        for (const order of orders) {
            try {
                await axios.post(
                    "http://localhost:3001/orders",
                    order
                );
            } catch (error) {
                console.error("Add item failed:", error);
            }
        }
    };

    const deleteItemDb = async (id: string) => {
        await axios.delete(`http://localhost:3001/orders/${id}`)
        const updateOrder = items.filter((order) => {
            return order.id !== id;
        })
        setItems(updateOrder);
    };

    const clearItems = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{ items, saveItem, updateItem, getItemDb, addItemDb, removeItem, deleteItemDb, clearItems }}
        >
            {children}
        </CartContext.Provider>
    );
}
