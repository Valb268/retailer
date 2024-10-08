'use client'
import React, {useEffect, useState} from 'react';
import {imageTemplate} from "@/app/lib/constants";
import Product from "@/app/components/Product";
import {ProductInterface} from "@/app/page";
import PencilIcon from "@/app/admin/PencilIcon";
import Trash from "@/app/admin/Trash";
import EditWindow from "@/app/admin/EditWindow";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {fetchProductsThunk, fetchUnpublishedThunk} from "@/app/lib/features/productsActions";
import dayjs from "dayjs";

export default function AdminDashboard() {

    const [currentProducts, setCurrentProducts] = useState<ProductInterface[]>([]);
    const [currentProduct, setCurrentProduct] = useState<ProductInterface | null>(null);
    const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
    const [editProduct, setEditProduct] = useState<ProductInterface | null>(null);
    const [isProductsChanged, setProductsChanged] = useState(true);
    const [isUnpublishedShown, setUnpublishedShown] = useState(false);

    const products = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isProductsChanged) {
            if (isUnpublishedShown) {
                dispatch(fetchUnpublishedThunk());
            } else {
                dispatch(fetchProductsThunk());
            }
        }
        return () => setProductsChanged(false);
    }, [dispatch, isProductsChanged, isUnpublishedShown]);

    useEffect(() => {
        if (products) {
            setCurrentProducts(products);
        }
    }, [products]);

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, product: ProductInterface) {
        setCurrentProduct(product);
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        const target = e.target as HTMLElement;
        target.style.border = 'none';
    }

    async function dropHandler(e: React.DragEvent<HTMLDivElement>, product: ProductInterface) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        target.style.border = 'none';
        if (products && currentProduct) {
            const newProducts = [...currentProducts];
            const sourceProductIndex = currentProducts.findIndex(p => p.id === currentProduct?.id);
            const sourceProductOrder = currentProducts[sourceProductIndex].order;
            const destinationProductIndex = currentProducts.findIndex(p => p.id === product.id);
            const destinationProductOrder = currentProducts[destinationProductIndex].order;

            const response = await fetch('/api/dnd', {
                method: 'POST',
                body: JSON.stringify({
                    sourceProductId: currentProduct.id,
                    sourceProductOrder,
                    destinationProductId: product.id,
                    destinationProductOrder,
                })
            })
            if (response.ok) {
                newProducts[sourceProductIndex] = currentProducts[destinationProductIndex];
                newProducts[destinationProductIndex] = currentProducts[sourceProductIndex];
                setCurrentProducts(newProducts);
                setProductsChanged(true);
                toast('Products switched successfully');
            }
        }
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

    const handleSave = async (product: ProductInterface) => {
        if (!product.image) {
            product.image = imageTemplate;
        }

        if (currentProducts) {
            const index = currentProducts.findIndex(p => p.id === product.id);
            const newProducts = [...currentProducts];

            // in case of a new product
            if (index === -1) {
                const response = await fetch('api/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                if (response.ok) {
                    setCurrentProducts([...newProducts, product]);
                    setProductsChanged(true);
                    toast("New product added");
                }
            } else {
                const response = await fetch('api/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                if (response.ok) {
                    newProducts[index] = product;
                    setCurrentProducts(newProducts);
                    setProductsChanged(true);
                    toast('Product updated');
                }
            }
        }
    };

    function addNewProduct() {
        if (currentProducts) {
            const publishDate = dayjs().format('YYYY-MM-DD');
            const newProduct = {
                id: 0,
                name: '',
                description: '',
                price: '',
                image: '',
                order: 0,
                publish_date: publishDate
            }
            handleEdit(newProduct);
        }
    }

    async function handleDelete (id: number) {
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                toast('Deleted successfully')
                setCurrentProducts(currentProducts.filter(p => p.id !== id));
            } else {
                toast('Failed to delete an item');
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : 'unknown error'
            toast(`An error occurred during deleting: ${message}`)
        }

    }

    async function handleShowUnpublished() {
        setUnpublishedShown((prevState) => !prevState);
        setProductsChanged(true);
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
                        className="flex flex-wrap gap-2 justify-center"
                    ><button
                        className="rounded-md bg-indigo-600 px-3 py-2 my-1 lg:my-0 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleShowUnpublished}
                    >{isUnpublishedShown ? 'Hide unpublished products' : 'Show unpublished products'}
                    </button>
                        <button
                            className="rounded-md bg-indigo-600 px-3 py-2 my-1 lg:my-0 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={addNewProduct}
                        >Add new product
                        </button>

                    </div>

                </div>
            </header>
            <div
                className="mx-auto my-6 flex px-4 py-6 sm:px-6 lg:px-8 flex-wrap gap-4 sm:gap-6 md:gap-9 lg:gap-11 xl:gap-13 min-h-[600px] max-w-7xl">
                {currentProducts && currentProducts.map(product => <div
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
                        publishDate={product.publish_date}
                    />
                    {hoveredProductId === product.id && (
                        <div className="absolute top-0 right-3 flex space-x-2 p-2">
                            <button
                                className="bg-blue-500 px-2 py-1 rounded-md"
                                onClick={() => handleEdit(product)}
                            ><PencilIcon/></button>
                            <button
                                className="bg-red-500 px-2 py-1 rounded-md"
                                onClick={() => handleDelete(product.id)}
                            ><Trash/></button>
                        </div>
                    )}

                </div>)}
                {editProduct && <EditWindow
                    isOpen={!!editProduct}
                    handleClose={() => setEditProduct(null)}
                    product={editProduct}
                    handleSave={handleSave}
                />}
            </div>

        </div>
    );
}
