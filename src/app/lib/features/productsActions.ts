import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductInterface} from "@/app/page";
import {toast} from "react-toastify";

export const fetchProductsThunk = createAsyncThunk<ProductInterface[] | undefined, void>(
    'products/fetch',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch(`api/getproducts`);
            if (!response.ok) {
                return rejectWithValue('Failed to fetch products');
            }
            const data: ProductInterface[] = await response.json();
            return data;
        } catch (error) {
            toast('Failed to fetch products')
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    })