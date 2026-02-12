import { createContext, useState, useCallback } from "react";
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
    addItem: (item: CartItem) => void;
    removeItem: (index: string) => void;
    clearCart: () => void;
    getItem: () => Promise<void>;
    saveItem: (item: CartItem) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {

    const [items, setItems] = useState<CartItem[]>([]);

    const saveItem = (item: CartItem) => {
        setItems((prev) => [...prev, item]);
        console.log(items);
    }

    const getItem = useCallback(async () => {
        const res = await axios.get("http://localhost:3001/orders")
        setItems(res.data);
    }, []);

    const addItem = async (item: CartItem) => {
        try {
            const res = await axios.post(
                "http://localhost:3001/orders",
                item
            );

            setItems((prev) => [...prev, res.data]);
        } catch (error) {
            console.error("Add item failed:", error);
        }
    };

    const removeItem = async (id: string) => {
        await axios.delete(`http://localhost:3001/orders/${id}`)
        const updateOrder = items.filter((order) => {
            return order.id !== id;
        })
        setItems(updateOrder);
    };

    // updateItem
    // const updateItem = async (item: CartItem){

    // }

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{ items, saveItem, getItem, addItem, removeItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
