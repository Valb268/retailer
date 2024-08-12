import {sql} from "@vercel/postgres";
import {NextResponse} from "next/server";

export async function POST(req: Request) {

    try {
        const {
            sourceProductId,
            sourceProductOrder,
            destinationProductId,
            destinationProductOrder
        } = await req.json();

        const { rows } = await sql`
            UPDATE products
            SET "order" = +${destinationProductOrder}
            WHERE id = +${sourceProductId}
            RETURNING *;
            `

         await sql`
            UPDATE products
            SET "order" = +${sourceProductOrder}
            WHERE id = +${destinationProductId};`

        return NextResponse.json(rows[0], {
            status: 201, headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        return new Response('Failed to change places', {status: 500});
    }
}