'use client'
import React, {useState} from 'react';
import {imageTemplate, products} from "@/app/lib/constants";
import Product from "@/app/components/product";
import {ProductInterface} from "@/app/products/page";
import PencilIcon from "@/app/components/PencilIcon";
import Trash from "@/app/components/Trash";
import EditWindow from "@/app/components/EditWindow";
import {generateProductId} from "@/app/lib/utils";

export default function AdminDashboard() {
    const [currentProducts, setCurrentProducts] = useState(products);
    const [currentProduct, setCurrentProduct] = useState<ProductInterface | null>(null);
    const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
    const [editProduct, setEditProduct] = useState<ProductInterface | null>(null);


    // const handleAddProduct = async (e: FormEvent) => {
    //     e.preventDefault();
    //
    //     const product: Product = {
    //         name,
    //         price: parseFloat(price),
    //         description,
    //     };
    //
    //     const res = await fetch('/api/add-product', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(product),
    //     });
    //
    //     if (res.ok) {
    //         setName('');
    //         setPrice('');
    //         setDescription('');
    //     } else {
    //         console.error('Failed to add products');
    //     }
    // };


    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, product: ProductInterface) {
        setCurrentProduct(product);
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        const target = e.target as HTMLElement;
        target.style.border = 'none';
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, product: ProductInterface) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        target.style.border = 'none';
        const newProducts = [...currentProducts];
        const sourceProductIndex = currentProducts.findIndex(p => p.id === currentProduct?.id);
        const destinationProductIndex = currentProducts.findIndex(p => p.id === product.id);
        newProducts[sourceProductIndex] = currentProducts[destinationProductIndex];
        newProducts[destinationProductIndex] = currentProducts[sourceProductIndex];
        setCurrentProducts(newProducts);
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        target.style.borderRadius = '10px';
        target.style.border = '1px solid darkred';
    }

    function handleEdit(product: ProductInterface | null) {
        setEditProduct(product);
    }

    const handleSave = (product: ProductInterface) => {
        if (!product.image) {
            product.image = imageTemplate;
        }
        const index = currentProducts.findIndex(p => p.id === product.id);
        const newProducts = [...currentProducts];
        if (index === -1) {
            setCurrentProducts([...newProducts, product]);
            return;
        }
        newProducts[index] = product;
        setCurrentProducts(newProducts);
    };

    function handleSaveCatalog() {
        // TODO
    }

    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
                    <div className="flex items-center">
                        <h1 className="text-xl lg:text-3xl font-bold tracking-tight text-gray-900">Content Management
                            Dashboard</h1>
                    </div>
                    <div
                    >
                        <button
                            className="rounded-md mr-5 bg-indigo-600 px-3 py-2 my-1 lg:my-0 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => {
                                const newProduct = {
                                    id: generateProductId(products),
                                    name: '',
                                    description: '',
                                    price: '',
                                    image: ''
                                }
                                handleEdit(newProduct);
                            }}
                        >Add new product
                        </button>
                        <button
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSaveCatalog}
                        >Save changes to catalog
                        </button>
                    </div>

                </div>
            </header>
            <div
                className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-wrap place-content-center items-start min-h-[600px] max-w-[1280px]">
                {currentProducts.map(product => <div
                    key={product.id}
                    style={{padding: '0 10px', position: 'relative'}}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, product)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, product)}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                >
                    <Product
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.image}
                    />
                    {hoveredProductId === product.id && (
                        <div className="absolute top-0 right-3 flex space-x-2 p-2">
                            <button
                                className="bg-blue-500 px-2 py-1 rounded-md"
                                onClick={() => handleEdit(product)}
                            ><PencilIcon/></button>
                            <button
                                className="bg-red-500 px-2 py-1 rounded-md"
                                onClick={() => setCurrentProducts(currentProducts.filter(p => p.id !== product.id))}
                            ><Trash/></button>
                        </div>
                    )}
                    {editProduct && <EditWindow
                        isOpen={!!editProduct}
                        handleClose={() => setEditProduct(null)}
                        product={editProduct}
                        handleSave={handleSave}
                    />}

                </div>)}

            </div>

        </div>
    );
}
