import { createContext, useState, useCallback } from "react";
import axios from "axios";

export type CartItem = {
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
    removeItem: (index: number) => void;
    clearCart: () => void;
    fetchCart: () => Promise<void>;
};


export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {


    const [items, setItems] = useState<CartItem[]>([]);

    const fetchCart = useCallback(async () => {
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
    const removeItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setItems([]);
    };


    return (
        <CartContext.Provider
            value={{ items, fetchCart, addItem, removeItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
