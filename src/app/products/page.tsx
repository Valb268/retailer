import {products} from "@/app/lib/constants";

export interface ProductInterface {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
}


export const revalidate = 60; // Regenerate the page every 60 seconds

export default async function ProductsPage() {
    // const file = await fs.readFile(process.cwd() + '/data/products.json', 'utf8');

    // const products: ProductInterface[] = JSON.parse(file);



    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.name}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
