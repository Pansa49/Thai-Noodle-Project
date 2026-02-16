import billData from "../../database/db.json";

export function billLoader() {
    return billData.orders;
}
