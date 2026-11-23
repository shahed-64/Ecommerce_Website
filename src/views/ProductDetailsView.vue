
<template>
  <div class="product-details-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <!-- BREADCRUMB -->
    <div class="breadcrumb-section">
      <div class="details-container breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <i class="bi bi-chevron-right"></i>
        <RouterLink to="/shop">Shop</RouterLink>
        <i class="bi bi-chevron-right"></i>
        <span>{{ product.category }}</span>
      </div>
    </div>

    <!-- PRODUCT DETAILS -->
    <main class="details-container">

      <div v-if="loading" class="product-loading">
        Loading product details...
      </div>

      <div v-else-if="error" class="product-error">
        {{ error }}
        <RouterLink to="/shop">Back to Shop</RouterLink>
      </div>

      <template v-else>

        <section class="product-main">

          <!-- IMAGE GALLERY -->
          <div class="gallery-section">
            <div class="thumbnail-list">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                :class="{ active: activeImage === index }"
                @click="activeImage = index"
              >
                <img :src="image" :alt="product.name" />
              </button>
            </div>

            <div
              class="main-image"
              @mousemove="zoomImage"
              @mouseleave="resetZoom"
            >
              <button
                class="image-expand"
                @click="showImageModal = true"
              >
                <i class="bi bi-arrows-fullscreen"></i>
              </button>

              <img
                :src="product.images[activeImage]"
                :alt="product.name"
                :style="zoomStyle"
              />
            </div>
          </div>

          <!-- PRODUCT INFORMATION -->
          <div class="product-information">

            <div class="product-brand">
              {{ product.brand || 'BASTRO KUTIR' }}
            </div>

            <h1>{{ product.name }}</h1>

            <div class="price-row">
              <strong>
                ৳{{ displayPrice.toLocaleString('en-BD') }}
              </strong>
            </div>

            <p class="product-description">
              {{ product.description || 'No description available.' }}
            </p>

            <div
              class="stock-status"
              :class="{ 'out-of-stock': !isAvailable }"
            >
              <i
                :class="isAvailable
                  ? 'bi bi-check-circle-fill'
                  : 'bi bi-x-circle-fill'"
              ></i>

              {{ isAvailable ? 'In Stock - Ready to Ship' : 'Out of Stock' }}
            </div>

            <!-- COLOR OPTIONS -->
            <div
              v-if="colors.length"
              class="option-group"
            >
              <div class="option-heading">
                Select Color
                <span>{{ selectedColor || 'Choose a color' }}</span>
              </div>

              <div class="color-options">
                <button
                  v-for="color in colors"
                  :key="color.name"
                  :title="color.name"
                  :class="{ selected: selectedColor === color.name }"
                  :style="{ background: color.value }"
                  @click="selectColor(color.name)"
                ></button>
              </div>
            </div>

            <!-- SIZE OPTIONS -->
            <div
              v-if="sizes.length"
              class="option-group"
            >
              <div class="option-heading">
                Select Size
                <span>{{ selectedSize || 'Choose a size' }}</span>
              </div>

              <div class="size-options">
                <button
                  v-for="size in sizes"
                  :key="size"
                  :class="{ selected: selectedSize === size }"
                  :disabled="!isSizeAvailable(size)"
                  @click="selectSize(size)"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <div
              v-if="variants.length && !selectedVariant"
              class="variant-warning"
            >
              Please select an available product option.
            </div>

            <!-- QUANTITY AND CART -->
            <div class="purchase-row">

              <div class="quantity-control">
                <button
                  @click="quantity = Math.max(1, quantity - 1)"
                  :disabled="!isAvailable"
                >
                  <i class="bi bi-dash"></i>
                </button>

                <span>{{ quantity }}</span>

                <button
                  @click="quantity++"
                  :disabled="!isAvailable"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>

              <button
                class="add-to-cart"
                @click="handleAddToCart"
                :disabled="!canPurchase"
              >
                <i class="bi bi-bag-plus"></i>
                Add to Cart
              </button>
            </div>

            <button
              class="buy-now"
              @click="handleBuyNow"
              :disabled="!canPurchase"
            >
              Buy Now
              <i class="bi bi-arrow-right"></i>
            </button>

            <div class="product-assurances">
              <div>
                <i class="bi bi-truck"></i>
                <span>Fast Delivery</span>
              </div>

              <div>
                <i class="bi bi-shield-check"></i>
                <span>Secure Shopping</span>
              </div>

              <div>
                <i class="bi bi-arrow-repeat"></i>
                <span>Easy Returns</span>
              </div>
            </div>

            <div class="product-meta">
              <p>
                <span>SKU:</span>
                {{ selectedVariant?.sku || product.sku || product.id }}
              </p>

              <p>
                <span>Category:</span>
                {{ product.category }}
              </p>

              <p>
                <span>Brand:</span>
                {{ product.brand || 'N/A' }}
              </p>
            </div>

          </div>
        </section>

        <!-- PRODUCT INFORMATION TABS -->
        <section class="details-tabs">

          <div class="tab-buttons">
            <button
              :class="{ active: activeTab === 'description' }"
              @click="activeTab = 'description'"
            >
              Description
            </button>

            <button
              :class="{ active: activeTab === 'details' }"
              @click="activeTab = 'details'"
            >
              Product Details
            </button>

            <button
              :class="{ active: activeTab === 'shipping' }"
              @click="activeTab = 'shipping'"
            >
              Shipping & Returns
            </button>
          </div>

          <div class="tab-content">

            <div v-if="activeTab === 'description'">
              <h3>Made for Your Style</h3>

              <p>{{ product.description || 'No description available.' }}</p>

              <p>
                Discover timeless fashion with Bastro Kutir. We bring you
                carefully selected collections that combine traditional
                elegance with modern style.
              </p>
            </div>

            <div v-if="activeTab === 'details'">
              <h3>Product Specifications</h3>

              <div class="specification-row">
                <span>Product Name</span>
                <strong>{{ product.name }}</strong>
              </div>

              <div class="specification-row">
                <span>Category</span>
                <strong>{{ product.category }}</strong>
              </div>

              <div class="specification-row">
                <span>Brand</span>
                <strong>{{ product.brand || 'N/A' }}</strong>
              </div>

              <div
                v-if="product.material"
                class="specification-row"
              >
                <span>Material</span>
                <strong>{{ product.material }}</strong>
              </div>

              <div
                v-if="product.fabric_type"
                class="specification-row"
              >
                <span>Fabric Type</span>
                <strong>{{ product.fabric_type }}</strong>
              </div>

              <div
                v-if="product.width"
                class="specification-row"
              >
                <span>Width</span>
                <strong>{{ product.width }}</strong>
              </div>

              <div
                v-if="product.gsm"
                class="specification-row"
              >
                <span>GSM</span>
                <strong>{{ product.gsm }}</strong>
              </div>

              <div class="specification-row">
                <span>Availability</span>
                <strong>
                  {{ isAvailable ? 'In Stock' : 'Out of Stock' }}
                </strong>
              </div>
            </div>

            <div v-if="activeTab === 'shipping'">
              <h3>Delivery Information</h3>

              <p>
                We aim to deliver your order safely and conveniently.
              </p>

              <p>
                Cash on Delivery is available according to delivery location.
              </p>

              <p>
                Please contact our customer support for return and exchange assistance.
              </p>
            </div>

          </div>
        </section>

        <!-- RELATED PRODUCTS -->
        <section class="related-section">

          <div class="related-heading">
            <div>
              <span class="section-eyebrow">YOU MAY ALSO LIKE</span>
              <h2>Related Products</h2>
            </div>

            <RouterLink to="/shop">
              View All Products <i class="bi bi-arrow-right"></i>
            </RouterLink>
          </div>

          <div class="related-grid">
            <article
              v-for="item in relatedProducts"
              :key="item.id"
              class="related-card"
            >
              <RouterLink
                :to="`/product/${item.id}`"
                class="related-image"
              >
                <img :src="item.image" :alt="item.name" />
              </RouterLink>

              <div class="related-info">
                <small>{{ item.category }}</small>

                <RouterLink :to="`/product/${item.id}`">
                  {{ item.name }}
                </RouterLink>

                <strong>
                  ৳{{ item.price.toLocaleString('en-BD') }}
                </strong>
              </div>
            </article>
          </div>

        </section>

      </template>
    </main>

    <!-- IMAGE MODAL -->
    <Transition name="modal">
      <div
        v-if="showImageModal && product.images.length"
        class="image-modal"
        @click.self="showImageModal = false"
      >
        <button
          class="modal-close"
          @click="showImageModal = false"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <img
          :src="product.images[activeImage]"
          :alt="product.name"
        />
      </div>
    </Transition>

    <!-- TOAST -->
    <Transition name="toast">
      <div v-if="showToast" class="details-toast">
        <i class="bi bi-check-circle-fill"></i>
        {{ toastMessage }}
      </div>
    </Transition>

    <FooterView />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { useCart } from '../stores/cart'

const route = useRoute()
const router = useRouter()

const { cartCount, cartTotal, addToCart } = useCart()

// Local Laravel API
const API_BASE_URL = 'https://shop.shahedislam.xyz/api'

// Product state
const product = ref({
  id: null,
  name: '',
  category: '',
  brand: '',
  description: '',
  price: 0,
  images: [],
  variants: []
})

const relatedProducts = ref([])
const loading = ref(true)
const error = ref('')

// Selection state
const activeImage = ref(0)
const selectedColor = ref('')
const selectedSize = ref('')
const quantity = ref(1)

const activeTab = ref('description')
const showImageModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const zoomStyle = ref({})

// Available variants
const variants = computed(() => {
  return (product.value.variants || []).filter(
    variant => variant.is_available
  )
})

// Available colors
const colors = computed(() => {
  const uniqueColors = [
    ...new Set(
      variants.value
        .map(variant => variant.color)
        .filter(Boolean)
    )
  ]

  const colorMap = {
    black: '#242424',
    white: '#ffffff',
    red: '#e53935',
    blue: '#344d78',
    navy: '#172b4d',
    green: '#456b4c',
    maroon: '#7b1f32',
    pink: '#d58e9f',
    yellow: '#fbc02d',
    purple: '#7e57c2',
    brown: '#795548',
    grey: '#9e9e9e',
    gray: '#9e9e9e',
    orange: '#fb8c00'
  }

  return uniqueColors.map(name => ({
    name,
    value: colorMap[name.toLowerCase()] || name
  }))
})

// Available sizes
const sizes = computed(() => {
  return [
    ...new Set(
      variants.value
        .map(variant => variant.size)
        .filter(Boolean)
    )
  ]
})

// Selected variant
const selectedVariant = computed(() => {
  if (!variants.value.length) return null

  return variants.value.find(variant => {
    const colorMatches = selectedColor.value
      ? variant.color === selectedColor.value
      : true

    const sizeMatches = selectedSize.value
      ? variant.size === selectedSize.value
      : true

    return colorMatches && sizeMatches
  }) || null
})

// Effective price
const displayPrice = computed(() => {
  if (selectedVariant.value) {
    return Number(selectedVariant.value.sale_price) || 0
  }

  return Number(product.value.price) || 0
})

// Availability
const isAvailable = computed(() => {
  if (!product.value.is_available) return false

  if (!variants.value.length) {
    return true
  }

  return Boolean(selectedVariant.value)
})

const canPurchase = computed(() => {
  return isAvailable.value && quantity.value > 0
})

// Check if a size is available with the selected color
function isSizeAvailable(size) {
  return variants.value.some(variant => {
    const sizeMatches = variant.size === size

    const colorMatches = selectedColor.value
      ? variant.color === selectedColor.value
      : true

    return sizeMatches && colorMatches
  })
}

// Select color
function selectColor(color) {
  selectedColor.value = color

  const matchingVariants = variants.value.filter(
    variant => variant.color === color
  )

  if (
    selectedSize.value &&
    !matchingVariants.some(
      variant => variant.size === selectedSize.value
    )
  ) {
    selectedSize.value = matchingVariants[0]?.size || ''
  }
}

// Select size
function selectSize(size) {
  if (isSizeAvailable(size)) {
    selectedSize.value = size
  }
}

// Normalize image URL
function normalizeImageUrl(url) {
  if (!url) return ''

  return url.replace(
    /^http:\/\/localhost\//,
    'https://shop.shahedislam.xyz/api'
  )
}

// Map backend product data
function formatProduct(data) {
  const image = normalizeImageUrl(data.image_url)

  return {
    id: data.id,
    name: data.name,
    sku: data.sku || '',
    category: data.category?.name || 'General',
    brand: data.brand?.name || '',
    description: data.description || '',
    price: Number(data.sale_price) || 0,
    image,
    images: image ? [image] : [],
    is_available: Boolean(data.is_available),
    material: data.material || '',
    fabric_type: data.fabric_type || '',
    width: data.width || '',
    gsm: data.gsm || '',
    variants: data.variants || []
  }
}

// Load product details
async function fetchProduct() {
  loading.value = true
  error.value = ''

  try {
    const id = Number(route.params.id)

    if (!id || id <= 0) {
      throw new Error('Invalid product ID.')
    }

    const response = await fetch(
      `${API_BASE_URL}/storefront/products/${id}`
    )

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? 'Product not found.'
          : 'Unable to load product details.'
      )
    }

    const result = await response.json()

    // Supports both direct product and data-wrapped response
    const data = result.data || result

    product.value = formatProduct(data)

    if (!product.value.id) {
      throw new Error('Product data is invalid.')
    }

    // Initialize variant selection
    const availableVariants = variants.value

    selectedColor.value = availableVariants[0]?.color || ''
    selectedSize.value = availableVariants[0]?.size || ''

    activeImage.value = 0
    quantity.value = 1
    activeTab.value = 'description'
    showImageModal.value = false

    await fetchRelatedProducts()
  } catch (err) {
    console.error('Product Details Error:', err)
    error.value = err.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

// Load related products
async function fetchRelatedProducts() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/storefront/products?per_page=100`
    )

    if (!response.ok) return

    const result = await response.json()

    const productList = result.data?.data || result.data || []

    relatedProducts.value = productList
      .filter(item => Number(item.id) !== Number(product.value.id))
      .slice(0, 4)
      .map(item => ({
        id: item.id,
        name: item.name,
        category: item.category?.name || 'General',
        price: Number(item.sale_price) || 0,
        image: normalizeImageUrl(item.image_url)
      }))
  } catch (err) {
    console.error('Related Products Error:', err)
    relatedProducts.value = []
  }
}

// Route change
watch(
  () => route.params.id,
  () => {
    fetchProduct()
  },
  { immediate: true }
)

// Image zoom
function zoomImage(event) {
  const rect = event.currentTarget.getBoundingClientRect()

  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  zoomStyle.value = {
    transform: 'scale(1.8)',
    transformOrigin: `${x}% ${y}%`
  }
}

function resetZoom() {
  zoomStyle.value = {
    transform: 'scale(1)',
    transformOrigin: 'center'
  }
}

// Toast notification
let toastTimer

function notify(message) {
  toastMessage.value = message
  showToast.value = true

  clearTimeout(toastTimer)

  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 2500)
}

// Add to cart
function handleAddToCart() {
  if (!canPurchase.value) {
    notify('Please select an available product option.')
    return
  }

  addToCart(
    {
      id: product.value.id,
      variant_id: selectedVariant.value?.id || null,
      name: product.value.name,
      category: product.value.category,
      image: product.value.images[0] || '',
      price: displayPrice.value,
      selectedColor: selectedVariant.value?.color || '',
      selectedSize: selectedVariant.value?.size || '',
      sku: selectedVariant.value?.sku || product.value.sku || ''
    },
    quantity.value
  )

  notify(`${product.value.name} added to cart!`)
}

// Buy Now
function handleBuyNow() {
  if (!canPurchase.value) {
    notify('Please select an available product option.')
    return
  }

  handleAddToCart()
  router.push('/checkout')
}
</script>

<style scoped>
.product-details-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  color: #29231f;
  overflow-x: hidden;
}

.details-container {
  width: min(1320px, calc(100% - 50px));
  margin: 0 auto;
}

/* BREADCRUMB */
.breadcrumb-section {
  background: #faf9f7;
  border-bottom: 1px solid #eeeae5;
}

.breadcrumb {
  min-height: 55px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #a27b45;
}

.breadcrumb a {
  color: #777;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #a27b45;
}

/* MAIN PRODUCT */
.product-main {
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  gap: 65px;
  padding: 55px 0 80px;
}

/* GALLERY */
.gallery-section {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  gap: 17px;
  align-items: start;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.thumbnail-list button {
  width: 82px;
  height: 105px;
  padding: 0;
  border: 1px solid #e8e3dc;
  background: #f7f5f2;
  cursor: pointer;
  overflow: hidden;
  transition: .2s;
}

.thumbnail-list button.active {
  border: 2px solid #a27b45;
}

.thumbnail-list img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image {
  height: 620px;
  position: relative;
  overflow: hidden;
  background: #f6f3ef;
  cursor: zoom-in;
}

.main-image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .2s ease;
}

.image-discount {
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 20px;
  padding: 9px 13px;
  background: #a33c32;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

.image-expand {
  position: absolute;
  z-index: 3;
  right: 18px;
  top: 18px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #29231f;
  cursor: pointer;
}

/* INFORMATION */
.product-information {
  padding-top: 12px;
}

.product-brand,
.section-eyebrow {
  color: #a27b45;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
}

.product-information h1 {
  font-family: Georgia, serif;
  font-size: clamp(30px, 3vw, 43px);
  font-weight: 500;
  line-height: 1.2;
  margin: 16px 0;
  color: #29231f;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  color: #888;
  padding-bottom: 23px;
  border-bottom: 1px solid #eee;
}

.stars {
  color: #d6a34d;
  letter-spacing: 2px;
}

.rating-row > span:first-of-type {
  color: #29231f;
  font-weight: 700;
}

.rating-divider {
  color: #ddd;
}

.price-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 13px;
  padding: 24px 0 15px;
}

.price-row strong {
  font-size: 29px;
  color: #29231f;
}

.price-row del {
  font-size: 15px;
  color: #aaa;
}

.save-badge {
  background: #f8eee9;
  color: #a33c32;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 700;
}

.product-description {
  color: #777;
  font-size: 14px;
  line-height: 1.9;
  margin: 10px 0 18px;
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #42845a;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 28px;
}

.option-group {
  padding: 20px 0;
  border-top: 1px solid #eee;
}

.option-heading {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 15px;
}

.option-heading span {
  color: #a27b45;
  font-weight: 500;
}

.color-options {
  display: flex;
  gap: 12px;
}

.color-options button {
  width: 30px;
  height: 30px;
  border: 3px solid #fff;
  outline: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
}

.color-options button.selected {
  outline: 2px solid #a27b45;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.size-options button {
  width: 47px;
  height: 42px;
  background: #fff;
  border: 1px solid #e5e0d9;
  color: #555;
  cursor: pointer;
  font-size: 12px;
  transition: .2s;
}

.size-options button:hover,
.size-options button.selected {
  border-color: #29231f;
  background: #29231f;
  color: #fff;
}

.purchase-row {
  display: flex;
  gap: 13px;
  margin-top: 18px;
}

.quantity-control {
  height: 52px;
  display: flex;
  align-items: center;
  border: 1px solid #e5e0d9;
}

.quantity-control button {
  width: 40px;
  height: 100%;
  background: #fff;
  border: 0;
  color: #29231f;
  cursor: pointer;
  font-size: 17px;
}

.quantity-control span {
  min-width: 28px;
  text-align: center;
  font-size: 14px;
}

.add-to-cart {
  flex: 1;
  height: 52px;
  border: 1px solid #29231f;
  background: #29231f;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: .25s;
}

.add-to-cart:hover {
  background: #a27b45;
  border-color: #a27b45;
}

.add-to-cart i {
  margin-right: 8px;
}

.buy-now {
  width: 100%;
  height: 52px;
  margin-top: 12px;
  background: #fff;
  border: 1px solid #a27b45;
  color: #a27b45;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: .25s;
}

.buy-now:hover {
  background: #a27b45;
  color: #fff;
}

.buy-now i {
  margin-left: 8px;
}

.product-assurances {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 30px;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.product-assurances div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  color: #777;
  font-size: 10px;
}

.product-assurances i {
  color: #a27b45;
  font-size: 21px;
}

.product-meta {
  padding-top: 18px;
}

.product-meta p {
  margin: 8px 0;
  color: #777;
  font-size: 12px;
}

.product-meta span {
  display: inline-block;
  width: 90px;
  color: #29231f;
  font-weight: 700;
}

/* TABS */
.details-tabs {
  border-top: 1px solid #eae6e0;
  border-bottom: 1px solid #eae6e0;
  padding-bottom: 35px;
}

.tab-buttons {
  display: flex;
  gap: 35px;
  border-bottom: 1px solid #eee;
}

.tab-buttons button {
  padding: 22px 0;
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  color: #888;
  font-size: 13px;
  cursor: pointer;
}

.tab-buttons button.active {
  color: #29231f;
  border-bottom-color: #a27b45;
  font-weight: 700;
}

.tab-content {
  max-width: 850px;
  padding: 28px 0 10px;
  color: #777;
  font-size: 14px;
  line-height: 1.9;
}

.tab-content h3 {
  color: #29231f;
  font-family: Georgia, serif;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 15px;
}

.specification-row {
  display: flex;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  gap: 25px;
}

.specification-row span {
  width: 160px;
}

.specification-row strong {
  color: #29231f;
}

/* RELATED PRODUCTS */
.related-section {
  padding: 75px 0 90px;
}

.related-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 30px;
}

.related-heading h2 {
  margin: 10px 0 0;
  font-family: Georgia, serif;
  font-size: 35px;
  font-weight: 500;
}

.related-heading > a {
  color: #a27b45;
  text-decoration: none;
  font-size: 12px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.related-card {
  min-width: 0;
}

.related-image {
  display: block;
  position: relative;
  height: 300px;
  overflow: hidden;
  background: #f6f3ef;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s;
}

.related-card:hover .related-image img {
  transform: scale(1.07);
}

.related-image span {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #a33c32;
  color: #fff;
  padding: 6px 9px;
  font-size: 10px;
}

.related-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 14px;
}

.related-info small {
  color: #a27b45;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
}

.related-info a {
  color: #29231f;
  text-decoration: none;
  font-family: Georgia, serif;
  font-size: 16px;
}

.related-info strong {
  font-size: 14px;
}

/* IMAGE MODAL */
.image-modal {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0,0,0,.93);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.image-modal img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.modal-close {
  position: absolute;
  top: 25px;
  right: 30px;
  width: 45px;
  height: 45px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #222;
  cursor: pointer;
  font-size: 18px;
}

/* TOAST */
.details-toast {
  position: fixed;
  z-index: 10001;
  right: 25px;
  bottom: 25px;
  padding: 15px 22px;
  background: #252b25;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 8px 30px rgba(0,0,0,.2);
  font-size: 14px;
}

.details-toast i {
  color: #7bd49a;
  margin-right: 8px;
}

.toast-enter-active,
.toast-leave-active,
.modal-enter-active,
.modal-leave-active {
  transition: .3s ease;
}

.toast-enter-from,
.toast-leave-to,
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* RESPONSIVE */
@media (max-width: 1000px) {
  .product-main {
    gap: 30px;
  }

  .main-image {
    height: 520px;
  }

  .related-image {
    height: 240px;
  }
}

@media (max-width: 700px) {
  .details-container {
    width: calc(100% - 30px);
  }

  .product-main {
    grid-template-columns: 1fr;
    gap: 35px;
    padding: 30px 0 50px;
  }

  .gallery-section {
    grid-template-columns: 65px minmax(0, 1fr);
    gap: 10px;
  }

  .thumbnail-list button {
    width: 65px;
    height: 82px;
  }

  .main-image {
    height: 470px;
  }

  .product-information {
    padding-top: 0;
  }

  .product-information h1 {
    font-size: 32px;
  }

  .related-section {
    padding: 50px 0;
  }

  .related-heading {
    align-items: start;
    flex-direction: column;
    gap: 15px;
  }

  .related-heading h2 {
    font-size: 29px;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px 13px;
  }

  .related-image {
    height: 240px;
  }

  .tab-buttons {
    gap: 20px;
    overflow-x: auto;
  }

  .tab-buttons button {
    white-space: nowrap;
    font-size: 12px;
  }

  .image-modal {
    padding: 20px;
  }

  .image-modal img {
    max-width: 100%;
  }
}

@media (max-width: 400px) {
  .main-image {
    height: 380px;
  }

  .related-image {
    height: 200px;
  }

  .purchase-row {
    gap: 8px;
  }

  .quantity-control button {
    width: 32px;
  }

  .product-assurances div {
    font-size: 9px;
  }
}
</style>
