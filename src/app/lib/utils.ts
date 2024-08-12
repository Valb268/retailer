import {ProductInterface} from "@/app/Catalog";
import {toast} from "react-toastify";
import {sql} from "@vercel/postgres";

export const generateProductId = (products: ProductInterface[]): number => {
    let id = Math.trunc(Math.random() * 10000000);
    const isUniqueId = products.findIndex(p => p.id === id);
    if (isUniqueId !== -1) {
        return generateProductId(products);
    }
    return id;
}

export const getProducts = async () => {
    try {
        const res = await sql`SELECT * FROM products ORDER BY "order"`;
        if (res) {
            const products: ProductInterface[] = res.rows.map(row => ({
                id: row.id,
                name: row.name,
                price: row.price,
                description: row.description,
                image: row.image,
                order: row.order
            }));
            return products;
        } else {
            toast("Failed to fetch products");
        }
    } catch (error) {
        toast(error instanceof Error ? error.message : 'An error occurred');
    }
};


