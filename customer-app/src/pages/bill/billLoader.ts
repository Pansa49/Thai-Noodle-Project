import billData from "../../../../backend/database/orderdb.json";

export async function billLoader() {
    return billData.orders;
}
