import {sql} from "@vercel/postgres";
import {unstable_noStore as noStore} from "next/cache";

export async function GET() {
    noStore();
    try {
        const { rows } = await sql`SELECT * FROM products ORDER BY "order"`;

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Failed to fetch products', { status: 500 });
    }
}