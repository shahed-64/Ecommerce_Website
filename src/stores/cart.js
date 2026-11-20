
import { reactive, computed } from 'vue'

const state = reactive({
  items: []
})

// Add product to cart
function addToCart(product, quantity = 1) {
  const existingItem = state.items.find(
    item => item.id === product.id
  )

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    state.items.push({
      ...product,
      quantity
    })
  }
}

// Remove product from cart
function removeFromCart(productId) {
  state.items = state.items.filter(
    item => item.id !== productId
  )
}

// Update product quantity
function updateQuantity(productId, quantity) {
  const item = state.items.find(
    item => item.id === productId
  )

  if (!item) return

  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }

  item.quantity = quantity
}

// Clear entire cart
function clearCart() {
  state.items.splice(0, state.items.length)
}

// Total product quantity
const cartCount = computed(() => {
  return state.items.reduce(
    (total, item) => total + item.quantity,
    0
  )
})

// Total cart price
const cartTotal = computed(() => {
  return state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
})

export function useCart() {
  return {
    items: computed(() => state.items),
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}
