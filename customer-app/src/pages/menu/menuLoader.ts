import menudb from "../../../../customer-app/menudb.json"

export async function menuLoader() {
    return menudb.Menus;
}