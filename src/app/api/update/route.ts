import {sql} from "@vercel/postgres";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const {id, name, price, description, image, publish_date} = await req.json();
        const {rows} = await sql`
            UPDATE products
            SET name = ${name},
                price = ${price},
                description = ${description},
                image = ${image},
                publish_date = ${publish_date}
            WHERE id = ${id}
            RETURNING *;`

        return NextResponse.json(rows[0], {
            status: 201, headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Failed to update a product', {status: 500});
    }
}