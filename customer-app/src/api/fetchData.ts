import axios from "axios";
import type { CartItem } from "../../../shared/menuDetail";

//const BASE_URL = "https://thai-noodle-lab-customer-db-production.up.railway.app"
const TEST_URL = "http://localhost:4000";

export async function AddItemDb(orders: CartItem[], tableNo: string, sessionId: string) {
    for (const order of orders) {
        try {
            const orderData = {
                ...order,
                tableNo: tableNo,
                sessionId: sessionId,
            };
            await axios.post(
                `${TEST_URL}/orderDetails`,
                orderData,

            );
        } catch (error) {
            console.error("Add item failed:", error);
        }
    }
};

export async function getOrdersDb(tableNo: string, sessionId: string): Promise<boolean> {
    try {
        const response = await axios.get(`${TEST_URL}/orderDetails?tableNo=${tableNo}&sessionId=${sessionId}&status=ordering`);
        console.log("Fetched orders:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Failed to fetch orders:", error);
        throw error;
    }
}