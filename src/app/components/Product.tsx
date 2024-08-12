import Image from "next/image";
import React from "react";

type Props = {
    imageUrl: string,
    name: string,
    description: string,
    price: string,
}

const Product = ({imageUrl, name, description, price}: Props) => {
    return (
        <div className="group relative w-[150px] lg:w-[200px] 2xl:w-[250px]">
            <div
                className="aspect-w-9 aspect-h-10 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <Image
                    src={imageUrl}
                    alt={name}
                    className=""
                    fill={true}
                    draggable={true}
                    object-fit='cover'
                    sizes="10vw"
                    priority={true}
                />
            </div>
            <div className="mt-4 flex justify-between mb-5">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href="#">
                            {/*<span aria-hidden="true" className="absolute inset-0"></span>*/}
                            {name}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 max-w-[100px] ">{description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{price}</p>
            </div>
        </div>
    );
};

export default Product;