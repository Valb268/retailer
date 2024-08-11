'use client'
import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";

export default function DropdownButton() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            buttonRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 xl:hidden"
                onClick={toggleMenu}
                ref={buttonRef}
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            {isOpen && (
                <div ref={menuRef}
                    className="absolute xl:hidden mt-2 w-48 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-1">
                        <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Catalog</Link>
                        <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Categories</Link>
                        <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Company</Link>
                        <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Stores</Link>

                        <Link href="/" className="block lg:hidden px-4 py-2 text-gray-700 hover:bg-gray-100">Sign In</Link>
                        <Link href="/" className="block lg:hidden px-4 py-2 text-gray-700 hover:bg-gray-100">Create Account</Link>

                        <Link href="/admin" className="block lg:hidden px-4 py-2 text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>

                    </div>
                </div>
            )}
        </div>
    );
}
