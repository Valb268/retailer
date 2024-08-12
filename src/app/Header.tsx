import Link from "next/link";
import React from "react";
import DropdownButton from "@/app/components/DropDownButton";

const Header = () => {
    return (
        <header className="relative bg-white">
            <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">Get
                free delivery on orders over $100</p>
            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="flex h-16 items-center">
                        <DropdownButton/>

                        {/*<-- Logo -->*/}
                        <div className="ml-2 md:ml-4 flex ">
                            <Link href={'/'}>
                                <p style={{color: 'darkred'}}
                                   className="text-base md:text-xl"
                                >TheBestOnlineShop</p></Link>
                        </div>

                        {/*<-- Flyout menus -->*/}
                        <div className="hidden lg:ml-8 xl:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                <div className="flex">
                                    <div className="relative flex">
                                        {/*<-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->*/}
                                        <button type="button"
                                                className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800"
                                                aria-expanded="false">Categories
                                        </button>
                                    </div>
                                </div>

                                <a href="components#"
                                   className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Company</a>
                                <a href="components#"
                                   className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Stores</a>
                            </div>
                        </div>

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a href="components#" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign
                                    in</a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                                <a href="components#" className="text-sm font-medium text-gray-700 hover:text-gray-800">Create
                                    account</a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                                <Link href={'admin'} className="text-sm font-medium text-gray-700 hover:text-gray-800">Admin
                                    Dashboard</Link>
                            </div>

                            {/*<-- Search -->*/}
                            <div className="flex lg:ml-6">
                                <a href="components#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                                    </svg>
                                </a>
                            </div>

                            {/*<-- Cart -->*/}
                            <div className="ml-4 flow-root lg:ml-6">
                                <a href="components#" className="group -m-2 flex items-center p-2">
                                    <svg className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                         fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                         aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                    </svg>
                                    <span
                                        className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;