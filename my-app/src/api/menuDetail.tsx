export interface Menu {
    id: number;
    name: string;

    noodleIds: OptionItem[];     // ตัวเลือกเส้น
    meatIds: OptionItem[];       // ตัวเลือกเนื้อ
    vegetableIds: OptionItem[];  // ตัวเลือกผัก

    price: number;
    countNum: number;
}


interface OptionItem {
    id: number;
    name: string;
}