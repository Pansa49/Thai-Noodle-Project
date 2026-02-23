import menudb from "../../../../backend/menudb.json";

export async function listLoader() {
    return menudb.Menus;
}