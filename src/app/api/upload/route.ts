import {put} from '@vercel/blob';
import {customAlphabet} from "nanoid";
import {NextResponse} from "next/server";

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 7);

export async function POST(req: Request) {
    const file = req.body || '';
    const contentType = req.headers.get('content-type') || 'text/plain';
    const filename = `${nanoid()}.${contentType.split('/')[1]}`;
    const blob = await put(filename, file, {
        contentType, access: 'public'
    });
    return NextResponse.json(blob);
}