import data from "../database/menudb.json"

export const noodleMap = new Map(
    data.Noodles.map(n => [n.id, n])
)
export const meatMap = new Map(
    data.Meats.map(m => [m.id, m])
)
export const vegetableMap = new Map(
    data.Vegetable.map(v => [v.id, v])
)