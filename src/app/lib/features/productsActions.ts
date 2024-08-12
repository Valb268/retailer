import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductInterface} from "@/app/components/catalog";
import {toast} from "react-toastify";

export const fetchProductsThunk = createAsyncThunk<ProductInterface[] | undefined, void>(
    'products/fetch',
    async (_, {rejectWithValue}) => {
        try {
            const timestamp = Date.now();
            const response = await fetch(`api/getproducts?timestamp=${timestamp}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: ProductInterface[] = await response.json();
            return data;
        } catch (error) {
            toast('Failed to fetch products')
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    })