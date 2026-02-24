import axios from "axios";

const BASE_URL = "http://localhost:4000/staff-data"

export async function login(mail: string, password: string) {
    const response = await axios.get(BASE_URL, {
        params: { mail, password }
    });

    return response.data[0];
}