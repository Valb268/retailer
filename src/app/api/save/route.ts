import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(req: Request) {
    try {
        const {name, price, description, image} = await req.json();
        const {rows} = await sql`
            INSERT INTO products (name, price, description, image)
            VALUES (${name}, ${price}, ${description}, ${image})
            RETURNING *;
        `;

        return NextResponse.json(rows[0], {
            status: 201, headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Failed to save a new product', {status: 500});
    }
}
