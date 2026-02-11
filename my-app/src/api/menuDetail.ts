export interface Menu {
    id: number;
    name: string;

    noodleIds: number[];     // ตัวเลือกเส้น
    meatIds: number[];       // ตัวเลือกเนื้อ
    vegetableIds: number[];  // ตัวเลือกผัก

    price: number;
    countNum: number;
}

export type Noodle = OptionItem;
export type Meat = OptionItem;
export type Vegetable = OptionItem;


interface OptionItem {
    id: number;
    name: string;
}
