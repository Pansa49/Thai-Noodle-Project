import data from "../../menudb.json"

interface OptionItem {
    id: number;
    name: string;
}

export type Noodle = OptionItem;
export type Meat = OptionItem;
export type Vegetable = OptionItem;

export const noodleMap = new Map<number, Noodle>(
    data.Noodles.map(n => [n.id, n])
)

export const meatMap = new Map<number, Meat>(
    data.Meats.map(m => [m.id, m])
)

export const vegetableMap = new Map<number, Vegetable>(
    data.Vegetable.map(v => [v.id, v])
)