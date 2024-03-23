import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    furnitures: [],
    designs: [],
  }
}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload
      const addedProductId = product._id
      const existingProduct = state.data.furnitures.find(item => item.product._id == addedProductId)
      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        state.data.furnitures.push(action.payload)
      }
    },
    removeFromCart: (state, action) => {
      const removedProductId = action.payload._id
      const removedProductIndex = state.data.furnitures.findIndex(item => item.product._id == removedProductId)
      if (removedProductIndex !== -1) {
        state.data.furnitures.splice(removedProductIndex, 1)
      }
    },
    addDesignToCart: (state, action) => {
      const { product, quantity } = action.payload
      const addedProductId = product._id
      const existingProduct = state.data.designs.find(item => item.product._id == addedProductId)
      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        state.data.designs.push(action.payload)
      }
    },
    removeDesignFromCart: (state, action) => {
      const removedProductId = action.payload._id
      const removedProductIndex = state.data.designs.findIndex(item => item.product._id == removedProductId)
      if (removedProductIndex !== -1) {
        state.data.designs.splice(removedProductIndex, 1)
      }
    },
    clearCart: (state) => {
      state.data.furnitures = []
      state.data.designs = []
    }
  }
})
export const { addToCart, removeFromCart, addDesignToCart, removeDesignFromCart, clearCart } = cartSlice.actions
export const selectCart = (state) => state.cart.data
export const selectCartAmount = (state) => (state.cart.data.furnitures.length + state.cart.data.designs.reduce((total, item) => total += item.product.furnitures.length, 0))
export const selectTotalCost = (state) => (
  state.cart.data.furnitures.reduce((total, item) => total += item.product.price * item.quantity, 0)
  + state.cart.data.designs.reduce((total, item) => total += item.product.designPrice * item.quantity, 0)
)
export const selectDesignTotalCost = (state) => state.cart.data.designs.reduce((total, item) => total += item.product.price * item.quantity, 0)

export default cartSlice.reducer