import axios from "axios";
import type { CartItem } from "../../../shared/menuDetail";

const BASE_URL = "https://thai-noodle-lab-customer-db-production.up.railway.app"

export async function AddItemDb(orders: CartItem[], tableNo: string, status: string, userId: string) {
    for (const order of orders) {
        try {
            const orderData = {
                userId: userId,
                ...order,
                tableNo: tableNo,
                status: status
            };
            await axios.post(
                `${BASE_URL}/orders`,
                orderData,

            );
        } catch (error) {
            console.error("Add item failed:", error);
        }
    }
};

export async function getOrdersDb() {
    try {
        const response = await axios.get(`${BASE_URL}/orders`);
        return response.data;
    }
    catch (error) {
        console.error("Failed to fetch orders:", error);
        throw error;
    }
}