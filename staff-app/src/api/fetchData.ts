import axios from "axios";

// const BASE_URL = "https://thai-noodle-lab-staff-db-production.up.railway.app"
const BASE_URL_TEST = "http://localhost:4000"

export async function getUser(mail: string, password: string) {
    const response = await axios.get(`${BASE_URL_TEST}/staff-data`, {
        params: { mail, password }
    });

    return response.data[0];
}

export async function timeLog(id: string, user: string, role: string) {
    const response = await axios.post(`${BASE_URL_TEST}/time-log`, {
        staffId: id,
        name: user,
        role: role,
        timestamp: new Date().toISOString(),
    });

    return response.data;
}

export async function getOrders(tableNo: string) {
    try {
        // const response = await axios.get(`${BASE_URL_TEST}/orders`);
        const response = await axios.get(`${BASE_URL_TEST}/orders?tableNo=${tableNo}&status=ordering`);
        return response.data;
    }
    catch (error) {
        console.error("Failed to fetch orders:", error);
        throw error;
    }
}

export async function getTables() {
    const res = await axios.get(`${BASE_URL_TEST}/table-pos`);
    return res.data;
}

export async function createTables(tables: any[]) {
    for (const table of tables) {
        await axios.post(`${BASE_URL_TEST}/table-pos`, table);
    }
}

export async function updateTable(table: any) {
    await axios.put(`${BASE_URL_TEST}/table-pos/${table.id}`, table);
}

export async function saveTablesLayout(tables: any[]) {
    for (const table of tables) {
        await updateTable(table);
    }
}

export async function deleteTables(tableId: string) {
    await axios.delete(`${BASE_URL_TEST}/table-pos/${tableId}`);
}