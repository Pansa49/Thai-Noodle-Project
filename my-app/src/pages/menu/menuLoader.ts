import menudb from "../../database/menudb.json";

export async function menuLoader() {
    return menudb.Menus;
}