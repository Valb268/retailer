import {sql} from "@vercel/postgres";
import {unstable_noStore as noStore} from "next/cache";
import dayjs from "dayjs";

export async function GET() {
    noStore();
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
        const { rows } = await sql`SELECT * FROM products WHERE publish_date < ${timestamp} ORDER BY "order"`;

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Failed to fetch products', { status: 500 });
    }
}