import menudb from "../../../../customer-app/menudb.json"

export async function listLoader() {
    return menudb.Menus;
}