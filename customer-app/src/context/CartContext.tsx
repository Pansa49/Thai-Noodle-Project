import { createContext, useState, useEffect } from "react";
import type { CartItem } from "../../../shared/menuDetail";

type CartContextType = {
    id?: number;
    items: CartItem[];

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
        console.log({ items: items })
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

    const clearItems = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                saveItem, removeItem, updateItem, clearItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
