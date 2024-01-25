
export const fetchData = (payload) => {
  return {
    type: 'products/fetchData',
    payload: payload
  }
} 
export const setSearchText = (payload) => {
  return {
    type: 'filters/searchText',
    payload: payload
  }
}
export const setSearchBrand = (payload) => {
  return {
    type: 'filters/searchBrand',
    payload: payload
  }
}
export const setSearchCategory = (payload) => {
  return {
    type: 'filters/searchCategory',
    payload: payload
  }
}
export const setSearchPrice = (payload) => {
  return {
    type: 'filters/searchPrice',
    payload: payload
  }
}
export const setSearchStatus= (payload) => {
  return {
    type: 'filters/searchStatus',
    payload: payload
  }
}
