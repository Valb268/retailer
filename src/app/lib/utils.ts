import {ProductInterface} from "@/app/page";
import {toast} from "react-toastify";
import {sql} from "@vercel/postgres";
import dayjs from "dayjs";

export const generateProductId = (products: ProductInterface[]): number => {
    let id = Math.trunc(Math.random() * 10000000);
    const isUniqueId = products.findIndex(p => p.id === id);
    if (isUniqueId !== -1) {
        return generateProductId(products);
    }
    return id;
}

export const getProducts = async () => {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    try {
        const res = await sql`SELECT * FROM products WHERE publish_date < ${timestamp} ORDER BY "order"`;
        if (res) {
            const products: ProductInterface[] = res.rows.map(row => ({
                id: row.id,
                name: row.name,
                price: row.price,
                description: row.description,
                image: row.image,
                order: row.order,
                publish_date: row.publish_date
            }));
            return products;
        } else {
            toast("Failed to fetch products");
        }
    } catch (error) {
        toast(error instanceof Error ? error.message : 'An error occurred');
    }
};


