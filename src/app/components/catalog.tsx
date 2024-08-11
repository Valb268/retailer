import React from 'react';
import Product from "@/app/components/product";
import {products} from "@/app/lib/constants";

export default async function Catalog () {

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {products.map(product => <Product
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
