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
  }
})

export const fetchDataThunkAction = createAsyncThunk('fetchDataThunkAction', async (limit) => {
  let productListRes = await fetch(`https://dummyjson.com/products?limit=${limit}`)
  let data = await productListRes.json()
  return data
})

export default productsSlice