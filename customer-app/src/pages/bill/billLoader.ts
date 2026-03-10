import { getOrdersDb } from "../../api/fetchData";

export async function billLoader({ params }: any) {
    return getOrdersDb(params.tableNo, params.sessionId);
}