import Image from "next/image";
import React from "react";
import clsx from "clsx";

type Props = {
    imageUrl: string,
    name: string,
    description: string,
    price: string,
    cursorGrab?: boolean
}

const Product = ({imageUrl, name, description, price, cursorGrab}: Props) => {
    return (
        <div className="group relative w-[150px] lg:w-[200px] 2xl:w-[300px]">
            <div
                // style={{width: '250px'}}
                className={clsx(" aspect-w-9 aspect-h-10 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75", {"hover:cursor-pointer" : cursorGrab})}>
                <Image
                    src={imageUrl}
                    alt={name}
                    className=""
                    layout="fill"
                    draggable={true}
                    objectFit='cover'

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