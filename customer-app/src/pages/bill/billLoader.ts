import billData from "../../../../backend/orderdb.json";

export async function billLoader() {
    return billData.orders;
}
