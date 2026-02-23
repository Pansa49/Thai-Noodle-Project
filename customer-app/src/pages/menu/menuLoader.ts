import menudb from "../../../../backend/menudb.json";

export async function menuLoader() {
    return menudb.Menus;
}