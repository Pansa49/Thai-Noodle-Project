
// const URL_STAFF = "https://thai-noodle-lab-staff-db-production.up.railway.app"
const URL_TEST = " http://localhost:4000"

export async function getOrderSessionStatus(tableID: string, sessionID: string): Promise<boolean> {
    const res = await fetch(`${URL_TEST}/orderSessions?tableId=${tableID}&orderId=${sessionID}`);
    const data = await res.json();

    return data[0]?.active ?? false;
}