import {createSlice} from "@reduxjs/toolkit";
import {ProductInterface} from "@/app/Catalog";
import {fetchProductsThunk} from "@/app/lib/features/productsActions";

const productSlice = createSlice({
    name: 'products',
    initialState: [] as ProductInterface[],
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProductsThunk.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export default productSlice.reducer;