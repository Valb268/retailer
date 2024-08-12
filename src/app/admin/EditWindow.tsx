'use client'

import React, {useCallback, useState} from "react";
import {ProductInterface} from "@/app/Catalog";
import {toast} from "react-toastify";
import Image from 'next/image';

type Props = {
    isOpen: boolean,
    product: ProductInterface,
    handleClose: () => void,
    handleSave: (product: ProductInterface) => void
}

const EditWindow = ({isOpen, handleClose, product, handleSave}: Props) => {
    const [title, setTitle] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(product.image);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSave({
            id: product.id,
            name: title,
            price,
            image,
            description,
            order: 0
        });
        handleClose();
    }

    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {

        const uploadFile = async (uploadedFile: File) => {
            if (uploadedFile) {
                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        headers: {'content-type': uploadedFile.type},
                        body: uploadedFile,
                    });

                    if (response.ok) {
                        const {url} = await response.json();
                        setImage(url);
                        toast('File uploaded');
                    } else {
                        toast('Upload failed');
                    }
                } catch (error) {
                    toast('An error occurred during upload');
                }
            }
        }

        if (e.target.files && e.target.files.length > 0) {
            const uploadedFile = e.target.files[0];
            if ( uploadedFile.size / 1024 / 1024 > 4.5) {
                toast('File too large (max 4.5MB)');
            } else {
                await uploadFile(uploadedFile);
            }
        }

    }, []);


    return (
        <div
            className={`fixed inset-0 z-10 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-500 ease-in-out`}
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Background backdrop */}
            <div
                className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} ease-in-out duration-500`}
                aria-hidden="true"
            ></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        {/* Slide-over panel */}
                        <div
                            className={`pointer-events-auto relative w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${
                                isOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        >
                            {/* Close button */}
                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                <button
                                    type="button"
                                    className={`relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition-opacity duration-500 ease-in-out ${
                                        isOpen ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onClick={handleClose}
                                >
                                    <span className="absolute -inset-2.5"></span>
                                    <span className="sr-only">Close panel</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <h2 className="text-base font-semibold leading-6 text-gray-900 text-center"
                                        id="slide-over-title">
                                        Edit product
                                    </h2>
                                </div>
                                <div className="space-y-12 m-5 ">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <form
                                            onSubmit={onSubmit}
                                        >
                                            <div className="sm:col-span-4">
                                                <label htmlFor="name"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Product
                                                    title</label>
                                                <div className="mt-2 mb-5">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                        <input type="text" name="title" id="title"
                                                               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                               placeholder="Title"
                                                               value={title}
                                                               onChange={(e) => setTitle(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="price"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Price,
                                                    $</label>
                                                <div className="mt-2 mb-5">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                        <input type="text"
                                                               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                               placeholder="Price, $"
                                                               value={price}
                                                               onChange={(e) => setPrice(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="about"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                                <div className="mt-2 mb-5">
                                                    <textarea id="about" name="about" rows={3}
                                                              value={description}
                                                              onChange={(e) => setDescription(e.target.value)}
                                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                                </div>
                                            </div>


                                            <div className="col-span-full">
                                                <label htmlFor="cover-photo"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Product
                                                    image</label>
                                                <div
                                                    className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-5">
                                                    <div className="text-center">
                                                        {image && (
                                                            <div
                                                                className='aspect-w-9 aspect-h-10 rounded-md'
                                                            ><Image
                                                                key={image}
                                                                src={image}
                                                                alt="image"
                                                                layout='fill'
                                                                objectFit='cover'
                                                                className=""
                                                            /></div>
                                                        )}

                                                        {!image && <svg className="mx-auto h-12 w-12 text-gray-300"
                                                                        viewBox="0 0 24 24" fill="currentColor"
                                                                        aria-hidden="true">
                                                            <path fillRule="evenodd"
                                                                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                                  clipRule="evenodd"/>
                                                        </svg>}
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <label htmlFor="file-upload"
                                                                   className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="file-upload" type="file"
                                                                       accept="image/*"
                                                                       className="sr-only"
                                                                       onChange={handleFileUpload}
                                                                />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up
                                                            to 4.5MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">

                                                <div className="mt-2 mb-5">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                                        <input type="text" name="imageUrl" id="imageUrl"
                                                               className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                               placeholder="or just enter the url of the image"
                                                               value={image}
                                                               onChange={(e) => setImage(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="mt-6 flex items-center justify-center gap-x-6">
                                                <button type="button"
                                                        onClick={handleClose}
                                                        className="text-sm font-semibold leading-6 text-gray-900">Cancel
                                                </button>
                                                <button type="submit"
                                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditWindow;