import menudb from "../../database/menudb.json"

export async function listLoader() {
    return menudb.Menus;
}