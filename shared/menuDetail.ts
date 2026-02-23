export interface Menu {
    id: number;
    name: string;
    noodleIds: number[];
    meatIds: number[];
    vegetableIds: number[];
    price: number;
    countNum: number;
}

export type CartItem = {
    id: string;
    soup: string;
    noodle: number;
    meat: number[];
    vegetable: number;
    quantity: number;
    price: number;
};
