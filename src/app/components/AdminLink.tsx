import React from 'react';
import Link from "next/link";

const AdminLink = () => {
    return <Link href={'admin'} className="text-sm font-medium text-gray-700 hover:text-gray-800">Admin Dashboard</Link>
};

export default AdminLink;