import menudb from "../../../../backend/database/menudb.json";

export async function menuLoader() {
    return menudb.Menus;
}