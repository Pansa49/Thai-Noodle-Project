export function ClosePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">

            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">

                {/* Icon */}
                <div className="text-6xl">
                    🧾
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800">
                    ออเดอร์นี้ปิดแล้ว
                </h1>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed">
                    รายการสั่งอาหารของโต๊ะนี้ถูกปิดแล้ว <br />
                    หากต้องการสั่งเพิ่ม กรุณาเรียกพนักงาน
                </p>

                {/* Divider */}
                <div className="border-t pt-4 text-sm text-gray-400">
                    ขอบคุณที่ใช้บริการ 🙏
                </div>
            </div>

        </div>
    );
}