import {sql} from "@vercel/postgres";

export async function GET() {
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