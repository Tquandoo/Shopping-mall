import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    status: 'idle',
    data: [],
    totalRows: 0
  },
  reducers:{

  },
  extraReducers : (builder) => {
    builder
      .addCase(fetchDataThunkAction.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDataThunkAction.fulfilled, (state, action) => {
        state.data = action?.payload?.products
        state.status = 'idle'
        state.totalRows = action?.payload?.total
      })
      .addCase(addNewProductThunkAction.pending, (state, action) => {
        
      })
      .addCase(addNewProductThunkAction.fulfilled, (state, action) => {
          console.log(action.payload);
          state.data.unshift(action.payload)
      })
  }
})

export const fetchDataThunkAction = createAsyncThunk('productList/fetchDataThunkAction', async (limit) => {
  let productListRes = await fetch(`https://dummyjson.com/products?limit=${limit}`)
  let data = await productListRes.json()
  return data
})

export const addNewProductThunkAction = createAsyncThunk('productList/addNewProductThunkAction', async (newProduct) => {
  let newProductRes = await fetch('https://dummyjson.com/products', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
  })
  let data = await newProductRes.json()
  return data
})

export default productsSlice
