import axios from "axios";

//const BASE_URL = "https://thai-noodle-lab-staff-db-production.up.railway.app"
const TEST_URL = "http://localhost:4000"

export async function getUser(mail: string, password: string) {
    const response = await axios.get(`${TEST_URL}/staff-data`, {
        params: { mail, password }
    });

    return response.data[0];
}

export async function timeLog(id: string, user: string, role: string) {
    const response = await axios.post(`${TEST_URL}/time-log`, {
        staffId: id,
        name: user,
        role: role,
        timestamp: new Date().toISOString(),
    });

    return response.data;
}

export async function getOrders(tableNo: string) {
    try {
        // const response = await axios.get(`${BASE_URL}/orders`);
        const response = await axios.get(`${TEST_URL}/orders?tableNo=${tableNo}&status=ordering`);
        return response.data;
    }
    catch (error) {
        console.error("Failed to fetch orders:", error);
        throw error;
    }
}

export async function getTables() {
    const res = await axios.get(`${TEST_URL}/table-pos`);
    return res.data;
}

export async function createTables(tables: any[]) {
    for (const table of tables) {
        await axios.post(`${TEST_URL}/table-pos`, table);
    }
}

export async function updateTable(table: any) {
    await axios.put(`${TEST_URL}/table-pos/${table.id}`, table);
}

export async function saveTablesLayout(tables: any[]) {
    for (const table of tables) {
        await updateTable(table);
    }
}

export async function deleteTables(tableId: string) {
    await axios.delete(`${TEST_URL}/table-pos/${tableId}`);
}

export async function createOrder(data: { tableId: number }) {
    const response = await axios.post(`${TEST_URL}/orders`, {
        tableId: data.tableId,
        status: "ordering",
        createdAt: new Date().toISOString()
    });

    return response.data;
}

export async function createSession(data: { tableId: number; orderId: number }) {
    const response = await axios.post(`${TEST_URL}/orderSessions`, {
        tableId: data.tableId,
        orderId: data.orderId,
        active: true
    });

    return response.data;
}

export async function closeOrder(orderId: number) {
    const response = await axios.patch(`${TEST_URL}/orders/${orderId}`, {
        status: "paid"
    });

    return response.data;
}

export async function closeSession(sessionId: string) {
    const response = await axios.patch(`${TEST_URL}/orderSessions/${sessionId}`, {
        active: false
    });

    return response.data;
}