import { getOrdersDb } from "../../api/fetchData";

export async function billLoader() {
    return getOrdersDb();
}
