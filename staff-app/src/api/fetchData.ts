import axios from "axios";

const BASE_URL = "http://localhost:4000/staff-data"

export async function login(mail: string, password: string) {
    const response = await axios.get(
        `${BASE_URL}/staff?mail=${mail}&password=${password}`
    );

    return response.data[0];
}

export async function getData() {
    const response = await axios.get(BASE_URL);

    return response.data;
}