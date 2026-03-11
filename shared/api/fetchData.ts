
const URL_STAFF = "https://thai-noodle-lab-staff-db-production.up.railway.app"

export async function getOrderSessionStatus(tableID: string, sessionID: string) {
    const res = await fetch(`${URL_STAFF}/orderSessionsstatus?tableId=${tableID}&orderId=${sessionID}`);
    const data = await res.json();

    return data.active;
}