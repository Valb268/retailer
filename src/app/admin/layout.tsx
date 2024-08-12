import React from 'react';
import StoreProvider from "@/app/StoreProvider";

const AdminLayout = ({
                         children,
                     }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <StoreProvider>
                {children}
            </StoreProvider>
        </div>
    );
};

export default AdminLayout;