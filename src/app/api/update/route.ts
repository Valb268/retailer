import {sql} from "@vercel/postgres";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const {id, name, price, description, image} = await req.json();
        const {rows} = await sql`
            UPDATE products
            SET name = ${name},
                price = ${price},
                description = ${description},
                image = ${image}
            WHERE id = ${id}
            RETURNING *;`

        return NextResponse.json(rows[0], {
            status: 201, headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
        });
    } catch (error) {
        return new Response('Failed to update a product', {status: 500});
    }
}