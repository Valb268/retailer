import React from 'react';
import Product from "@/app/components/product";
import {getProducts} from "@/app/lib/utils";


export interface ProductInterface {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    order: number
}

export const revalidate = 60;

export default async function Catalog () {

    const products = await getProducts();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our products</h2>

                <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 md:gap-9 lg:gap-11 xl:gap-13 min-h-[600px] max-w-[1280px]">

                    {products && products.map(product => <Product
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.image}
                    />)}

                </div>
            </div>
        </div>
    );
};
