import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getProducts = createAsyncThunk('get/products', async (payload: any) => {
  const url = 'http://localhost:4000'
  const response = await axios.post(`${url}/api/v1/product`, payload);
  return response.data.data;
})

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false, isSuccess: false },
  reducers: {},
  extraReducers: (getData: any) => {
    getData.addCase(getProducts.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.products = action.payload;
      state.isSuccess = true;
    });

    getData.addCase(getProducts.pending, (state: any, action: any) => {
      state.loading = true;
    });

    getData.addCase(getProducts.rejected, (state: any, action: any) => {
      state.isSuccess = true;
      state.loading = false;
    })
  }
});

export default productsSlice.reducer
