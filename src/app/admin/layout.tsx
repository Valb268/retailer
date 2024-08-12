import React from 'react';
import StoreProvider from "@/app/components/StoreProvider";

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