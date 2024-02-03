export const priceAfterDiscount = (price, discountPercentage) => {
  return Math.round((price * (1 - Number(discountPercentage) * 0.01)))
}
export const formatCurrency = (number) => {
  return Number(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}