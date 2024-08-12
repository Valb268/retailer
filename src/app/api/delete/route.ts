import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(req: Request) {
    try {
        const {id} = await req.json();
        if (!id) {
            return new Response('Invalid ID', {status: 400});
        }
        const {rows} = await sql`
            DELETE FROM products WHERE id = ${id} RETURNING *;
        `;

        if (rows.length === 0) {
            return new Response('Item not found', {status: 404});
        }

        return NextResponse.json(rows[0], {
            status: 201, headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Failed deletion', {status: 500});
    }
}
