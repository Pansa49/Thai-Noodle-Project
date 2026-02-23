import menudb from "../../../../backend/database/menudb.json";

export async function listLoader() {
    return menudb.Menus;
}