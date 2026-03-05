import axios from "axios";

const BASE_URL = "https://thai-noodle-lab-staff-db-production.up.railway.app/"
// const BASE_URL_LOGIN = "http://localhost:4000/staff-data"
// const BASE_URL_TIMELOG = "http://localhost:4000/time-log"

export async function getUser(mail: string, password: string) {
    const response = await axios.get(`${BASE_URL}/staff-data`, {
        params: { mail, password }
    });

    return response.data[0];
}

export async function timeLog(id: string, user: string, role: string) {
    const response = await axios.post(`${BASE_URL}/time-log`, {
        staffId: id,
        name: user,
        role: role,
        timestamp: new Date().toISOString(),
    });

    return response.data;
}