import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(req: Request) {
    try {
        const {name, price, description, image, publish_date} = await req.json();
        const {rows} = await sql`
            INSERT INTO products (name, price, description, image, publish_date)
            VALUES (${name}, ${price}, ${description}, ${image}, ${publish_date})
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
