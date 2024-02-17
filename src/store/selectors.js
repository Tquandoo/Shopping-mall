import { createSelector } from "@reduxjs/toolkit";
import { priceAfterDiscount } from "../helper/helper";

export const filtersSelector = (state) => state.filters
export const productsSelector = (state) => state.products.data
export const cartSelector = (state) => state.cart
// lấy ra đúng cái orderList
export const orderListSelector = (state) => state.orders.orderList
export const orderLoadingSelector = (state) => state.orders.status

const filteredProductsSelector =  createSelector(
  productsSelector,
  filtersSelector,
  (products, filters) => {
    const { searchText, brand, category, price, status } = filters
    let filteredProducts = [...products]
    if(searchText) {
      filteredProducts = filteredProducts.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()))
    }
    if (brand !== 'All') {
      filteredProducts =  filteredProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
    }
    if (category !== 'All') {
        filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }
    if( price !== '0,0'){
      const [min, max] = price.split(',')
      if(min !== max){
        filteredProducts = filteredProducts.filter((p) => {
          let newPrice = priceAfterDiscount(p.price, p.discountPercentage)
          return newPrice >= min && newPrice <= max
        })
      }
      else{
        filteredProducts = filteredProducts.filter((p) => {
          let newPrice = priceAfterDiscount(p.price, p.discountPercentage)
          return newPrice >= min 
        })
      }
    }
    if(status.length) {
      if(status.includes('In stock')){
        filteredProducts = filteredProducts.filter((p) => p.stock > 0)
      }
      if(status.includes('On sale')) {
        filteredProducts = filteredProducts.filter((p) => p.discountPercentage > 0)
      }
    }
    return filteredProducts
  }
)
export default filteredProductsSelector