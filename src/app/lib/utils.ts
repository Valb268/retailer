import {ProductInterface} from "@/app/products/page";

export const generateProductId = (products: ProductInterface[]): number => {
    let id = Math.trunc(Math.random() * 10000000);
    const isUniqueId = products.findIndex(p => p.id === id);
    if (isUniqueId !== -1) {
        return generateProductId(products);
    }
    return id;
}