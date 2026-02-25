import axios from "axios";

const BASE_URL_LOGIN = "http://localhost:4000/staff-data"
const BASE_URL_TIMELOG = "http://localhost:4000/time-log"

export async function login(mail: string, password: string) {
    const response = await axios.get(BASE_URL_LOGIN, {
        params: { mail, password }
    });

    return response.data[0];
}

export async function TimeLog(id: string, user: string) {
    const response = await axios.post(BASE_URL_TIMELOG, {
        staffId: id,
        name: user,
        timestamp: new Date().toISOString(),
    });

    return response.data;
}