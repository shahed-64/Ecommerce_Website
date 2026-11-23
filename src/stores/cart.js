import { reactive, computed } from 'vue'

const state = reactive({
  items: []
})

// প্রতিটি Product Variant-এর জন্য আলাদা Cart Key
function getCartItemKey(product) {
  if (product.variant_id) {
    return `${product.id}-variant-${product.variant_id}`
  }

  return `${product.id}-${product.selectedColor || ''}-${product.selectedSize || ''}`
}

function addToCart(product, quantity = 1) {
  const cartKey = getCartItemKey(product)

  const existingItem = state.items.find(
    item => item.cartKey === cartKey
  )

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    state.items.push({
      ...product,
      cartKey,
      quantity
    })
  }
}

function removeFromCart(identifier) {
  const index = state.items.findIndex(
    item => item.cartKey === identifier || item.id === identifier
  )

  if (index !== -1) {
    state.items.splice(index, 1)
  }
}

function updateQuantity(identifier, quantity) {
  const item = state.items.find(
    item => item.cartKey === identifier || item.id === identifier
  )

  if (!item) return

  if (quantity <= 0) {
    removeFromCart(item.cartKey)
    return
  }

  item.quantity = quantity
}

function clearCart() {
  state.items.splice(0, state.items.length)
}

const cartCount = computed(() => {
  return state.items.reduce(
    (total, item) => total + item.quantity,
    0
  )
})

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