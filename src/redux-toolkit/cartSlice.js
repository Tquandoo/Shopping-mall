// thông tin giỏ
/*
    danh sách các sản phẩm
        + số lượng (quantity)
        + số tiền (amount)
    tổng tiền (total) = shipping fee + subtotal
        shipping (shipping fee)
        tổng tiền chưa có phí ship (subtotal)
        ngày mua (orderDate)
    thông tin người mua (customer info)
        họ và tên (fullname)
        địa chỉ (address)
        thư điện tử (email)
        số điện thoại (mobile)
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { v4 as uuid } from 'uuid'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      cartId: uuid(),
      cartInfo: {
        subtotal: 0,
        shipping: 0,
        total: 0,
        orderDate: new Date().valueOf()
      },  
      cartDetails: [],
      customerInfo: {
        fullname: '',
        address: '',
        email: '',
        mobile: ''
      }
    },
    reducers:{
      addToCart: (state, action) => {
        let cartItem = state.cartDetails.find((item) => item.id === action.payload.id)
        if(cartItem?.id){
          cartItem.quantity = Number(cartItem.quantity) + 1
          cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)
        }
        else{
          state.cartDetails.push({
            ...action.payload,
            quantity: 1,
            amount: action.payload.newPrice
          })
        }
        let newSubTotal = 0
        for(let item of state.cartDetails){
          newSubTotal += Number(item.amount)
        }
        let newTotal = newSubTotal + Number(state.cartInfo.shipping)
        state.cartInfo.total = newTotal
        state.cartInfo.subtotal = newSubTotal
      },
      incrementQuantity: (state, action) => {
        let cartItem = state.cartDetails.find((item) => item.id === action.payload.id)
        cartItem.quantity = Number(cartItem.quantity) + 1
        cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)

        let newSubtotal = 0
        for (let item of state.cartDetails) {
            newSubtotal += Number(item.amount)
        }
        let newTotal = newSubtotal + Number(state.cartInfo.shipping)
        state.cartInfo.subtotal = newSubtotal;
        state.cartInfo.total = newTotal
    },
    descrementQuantity: (state, action) => {
      let cartItem = state.cartDetails.find((item) => item.id === action.payload.id)
      cartItem.quantity = Number(cartItem.quantity) - 1
      cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)

      let newSubtotal = 0
      for (let item of state.cartDetails) {
          newSubtotal += Number(item.amount)
      }
      let newTotal = newSubtotal + Number(state.cartInfo.shipping)
      state.cartInfo.subtotal = newSubtotal;
      state.cartInfo.total = newTotal
    },
    removeCartItem : (state, action) => {
      state.cartDetails = state.cartDetails.filter((item) => item.id !== action.payload.id)
      let newSubtotal = 0
      for (let item of state.cartDetails) {
          newSubtotal += Number(item.amount)
      }
      let newTotal = newSubtotal + Number(state.cartInfo.shipping)
      state.cartInfo.subtotal = newSubtotal;
      state.cartInfo.total = newTotal
    }
    },
    extraReducers: (builder) => {
      builder
        .addCase(checkoutThunkAction.pending, (state, action) => {
        })
        .addCase(checkoutThunkAction.fulfilled, (state, action) => {
          state.cartId = uuid()
          state.cartInfo = {
            subtotal: 0,
            shipping: 0,
            total: 0,
            orderDate: new Date().valueOf()
          }
          state.cartDetails = []
          state.customerInfo = {
            fullname: '',
            address: '',
            email: '',
            mobile: ''
          }
        })
    }
})
export const checkoutThunkAction = createAsyncThunk('cart/checkout', async (data) => {
  let checkoutRes = await fetch('https://student-app-api.vercel.app/orderList' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let result = await checkoutRes.json()
  console.log('result customer info', result);
  return result
})
export default cartSlice