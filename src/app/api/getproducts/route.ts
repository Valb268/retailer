import {sql} from "@vercel/postgres";
import {unstable_noStore as noStore} from "next/cache";

export async function GET() {
    noStore();
    try {
        const { rows } = await sql`SELECT * FROM products ORDER BY "order"`;

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response('Failed to fetch products', { status: 500 });
    }
}