import billData from "../../database/db.json";

export async function billLoader() {
    return billData.orders;
}
