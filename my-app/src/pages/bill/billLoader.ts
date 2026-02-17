import billData from "../../database/orderdb.json";

export async function billLoader() {
    return billData.orders;
}
