
<template>
  <div class="shop-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <!-- SHOP HERO -->
    <section class="shop-hero">
      <div class="shop-hero-content">
        <span class="hero-tag">THE BASTRO KUTIR COLLECTION</span>
        <h1>Discover Your <span>Style</span></h1>
        <p>Explore timeless fashion, beautiful fabrics and everyday essentials.</p>
        <div class="hero-breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <i class="bi bi-chevron-right"></i>
          <span>Shop</span>
        </div>
      </div>
    </section>

    <!-- SHOP CONTENT -->
    <main class="shop-container">
      <div class="shop-heading">
        <div>
          <span class="section-eyebrow">OUR COLLECTION</span>
          <h2>Shop All Products</h2>
          <p>Find something beautiful for every occasion.</p>
        </div>

        <div class="product-count">
          <strong>{{ totalProducts }}</strong> Products
        </div>
      </div>

      <!-- FILTER TOOLBAR -->
      <div class="shop-toolbar">
        <div class="category-filters">
          <button
            v-for="category in categories"
            :key="category"
            :class="{ active: selectedCategory === category }"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </div>

        <div class="sort-box">
          <i class="bi bi-sort-down"></i>
          <select v-model="sortBy">
            <option value="default">Sort by: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="loading-products">
        <div class="loading-spinner"></div>
        <p>Loading products...</p>
      </div>

      <!-- API ERROR -->
      <div v-else-if="apiError" class="empty-products">
        <i class="bi bi-exclamation-circle"></i>
        <h3>Unable to load products</h3>
        <p>{{ apiError }}</p>
        <button @click="fetchProducts">Try Again</button>
      </div>

      <!-- PRODUCT GRID -->
      <div v-else-if="filteredProducts.length" class="product-grid">
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image">
            <RouterLink :to="`/product/${product.id}`">
              <img
                :src="product.image"
                :alt="product.name"
                @error="handleImageError"
              />
            </RouterLink>

            <button
              class="quick-view"
              @click="router.push(`/product/${product.id}`)"
              aria-label="View product"
            >
              <i class="bi bi-eye"></i>
            </button>

            <button
              class="add-cart-btn"
              :disabled="!product.is_available"
              @click="addProduct(product)"
            >
              <i class="bi bi-bag-plus"></i>
              {{ product.is_available ? 'Add to Cart' : 'Out of Stock' }}
            </button>
          </div>

          <div class="product-info">
            <span class="product-category">
              {{ product.category }}
            </span>

            <RouterLink
              :to="`/product/${product.id}`"
              class="product-name"
            >
              {{ product.name }}
            </RouterLink>

            <div class="product-price">
              <strong>৳{{ product.price.toLocaleString() }}</strong>
            </div>
          </div>
        </article>
      </div>

      <!-- EMPTY -->
      <div v-else class="empty-products">
        <i class="bi bi-search"></i>
        <h3>No products found</h3>
        <p>Try another category or search term.</p>
        <button @click="resetFilters">View All Products</button>
      </div>
    </main>

    <!-- ADD TO CART NOTIFICATION -->
    <Transition name="toast">
      <div v-if="showToast" class="shop-toast">
        <i class="bi bi-check-circle-fill"></i>
        {{ toastMessage }}
      </div>
    </Transition>

    <FooterView />
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

import {
  useRouter,
  useRoute,
  RouterLink
} from 'vue-router'

import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { useCart } from '../stores/cart'

// LOCAL BACKEND API
const API_BASE_URL = 'https://shop.shahedislam.xyz/api'

const router = useRouter()
const route = useRoute()

const {
  cartCount,
  cartTotal,
  addToCart
} = useCart()

// CATEGORIES
const categories = ref(['All'])
const categoryItems = ref([])

const selectedCategory = ref(
  typeof route.query.category === 'string'
    ? route.query.category
    : 'All'
)

// PRODUCTS
const products = ref([])
const totalProducts = ref(0)

const isLoading = ref(false)
const apiError = ref('')

// FILTERS
const sortBy = ref('default')
const searchQuery = ref('')

// TOAST
const showToast = ref(false)
const toastMessage = ref('')
let toastTimer = null

// LOAD CATEGORIES FROM BACKEND
async function fetchCategories() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/storefront/categories`
    )

    if (!response.ok) {
      throw new Error('Failed to load categories.')
    }

    const result = await response.json()

    categoryItems.value = result.data || []

    categories.value = [
      'All',
      ...categoryItems.value.map(category => category.name)
    ]

    // Keep URL category if it exists in backend
    if (!categories.value.includes(selectedCategory.value)) {
      selectedCategory.value = 'All'
    }

  } catch (error) {
    console.error('Category API Error:', error)
    categories.value = ['All']
  }
}

// LOAD PRODUCTS FROM BACKEND
async function fetchProducts() {
  isLoading.value = true
  apiError.value = ''

  try {
    const params = new URLSearchParams()

    params.append('per_page', '100')

    // Category Filter
    if (selectedCategory.value !== 'All') {
      const selected = categoryItems.value.find(
        category => category.name === selectedCategory.value
      )

      if (selected) {
        params.append('category_id', selected.id)
      }
    }

    // Search
    if (searchQuery.value.trim()) {
      params.append('search', searchQuery.value.trim())
    }

    // Sorting
    const sortMap = {
      default: 'latest',
      low: 'price_low',
      high: 'price_high',
      name: 'name'
    }

    params.append(
      'sort',
      sortMap[sortBy.value] || 'latest'
    )

    const response = await fetch(
      `${API_BASE_URL}/storefront/products?${params.toString()}`
    )

    if (!response.ok) {
      throw new Error('Unable to retrieve products from the server.')
    }

    const result = await response.json()

    // Convert backend products to frontend cart/card format
    products.value = (result.data || []).map(product => ({
      id: product.id,
      name: product.name,

      category: product.category?.name || 'General',

      price: Number(product.sale_price) || 0,

      image: product.image_url
      ? product.image_url.replace('https://shop.shahedislam.xyz/', 'https://shop.shahedislam.xyz/api')
      : '',

      is_available: product.is_available,

      // Preserve the API response for future product details
      backendData: product
    }))

    totalProducts.value = result.total || 0

  } catch (error) {
    console.error('Product API Error:', error)

    apiError.value = error.message
    products.value = []
    totalProducts.value = 0

  } finally {
    isLoading.value = false
  }
}

// FILTERED PRODUCTS
const filteredProducts = computed(() => products.value)

// CATEGORY FILTER
function selectCategory(category) {
  selectedCategory.value = category

  router.replace({
    path: '/shop',
    query: category === 'All' ? {} : { category }
  })
}

// URL CATEGORY SYNC
watch(
  () => route.query.category,
  newCategory => {
    const category =
      typeof newCategory === 'string' &&
      categories.value.includes(newCategory)
        ? newCategory
        : 'All'

    if (selectedCategory.value !== category) {
      selectedCategory.value = category
    }
  }
)

// FETCH PRODUCTS WHEN FILTER CHANGES
watch(
  [selectedCategory, searchQuery, sortBy],
  () => {
    fetchProducts()
  }
)

// ADD TO CART
function addProduct(product) {
  addToCart(product, 1)

  toastMessage.value = `${product.name} added to cart!`
  showToast.value = true

  clearTimeout(toastTimer)

  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 2500)
}

// SEARCH
function handleProductSearch(event) {
  searchQuery.value = event.detail || ''

  selectedCategory.value = 'All'

  if (route.query.category) {
    router.replace({
      path: '/shop',
      query: {}
    })
  }
}

// RESET FILTERS
function resetFilters() {
  selectedCategory.value = 'All'
  searchQuery.value = ''
  sortBy.value = 'default'

  router.replace({
    path: '/shop',
    query: {}
  })
}

// IMAGE ERROR
function handleImageError(event) {
  event.target.style.display = 'none'
}

// LIFECYCLE
onMounted(async () => {
  await fetchCategories()
  await fetchProducts()

  window.addEventListener(
    'product-search',
    handleProductSearch
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'product-search',
    handleProductSearch
  )

  clearTimeout(toastTimer)
})
</script>

<style scoped>
.shop-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
}

/* HERO */
.shop-hero {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 55px 20px;
  color: #fff;
  background:
    linear-gradient(rgba(24, 19, 17, .72), rgba(24, 19, 17, .72)),
    url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85')
    center 45% / cover no-repeat;
}

.shop-hero-content {
  max-width: 700px;
}

.hero-tag,
.section-eyebrow {
  color: #c9a46a;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
}

.shop-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(38px, 6vw, 62px);
  font-weight: 500;
  margin: 15px 0;
}

.shop-hero h1 span {
  color: #d7b47b;
  font-style: italic;
}

.shop-hero p {
  color: #eee;
  font-size: 15px;
  margin-bottom: 22px;
}

.hero-breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #d7b47b;
}

.hero-breadcrumb a {
  color: #fff;
  text-decoration: none;
}

/* MAIN */
.shop-container {
  max-width: 1320px;
  margin: auto;
  padding: 65px 25px 85px;
}

.shop-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 35px;
}

.shop-heading h2 {
  font-family: Georgia, serif;
  font-size: 38px;
  color: #25211e;
  margin: 10px 0;
}

.shop-heading p {
  color: #888;
  font-size: 14px;
  margin: 0;
}

.product-count {
  color: #888;
  font-size: 14px;
  padding-bottom: 5px;
}

.product-count strong {
  color: #a27b45;
}

/* TOOLBAR */
.shop-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 17px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.category-filters button {
  border: 1px solid #e8e2da;
  background: #fff;
  color: #666;
  padding: 9px 17px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  transition: .25s;
}

.category-filters button:hover,
.category-filters button.active {
  background: #29231f;
  border-color: #29231f;
  color: #fff;
}

.sort-box {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a27b45;
  white-space: nowrap;
}

.sort-box select {
  border: 0;
  outline: none;
  background: transparent;
  color: #555;
  font-size: 13px;
  cursor: pointer;
}

/* LOADING */
.loading-products {
  text-align: center;
  padding: 75px 15px;
  color: #888;
}

.loading-spinner {
  width: 38px;
  height: 38px;
  margin: 0 auto 15px;
  border: 3px solid #eee;
  border-top-color: #a27b45;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* PRODUCT GRID */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 35px 22px;
}

.product-card {
  min-width: 0;
  background: #fff;
}

.product-image {
  position: relative;
  height: 340px;
  overflow: hidden;
  background: #f6f3ef;
}

.product-image > a {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .6s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.09);
}

.quick-view {
  position: absolute;
  top: 13px;
  right: 13px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #29231f;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-5px);
  transition: .25s;
}

.product-card:hover .quick-view {
  opacity: 1;
  transform: translateY(0);
}

.add-cart-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 13px;
  border: none;
  background: #29231f;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(100%);
  transition: .3s;
}

.add-cart-btn i {
  margin-right: 7px;
}

.product-card:hover .add-cart-btn {
  transform: translateY(0);
}

.add-cart-btn:disabled {
  background: #888;
  cursor: not-allowed;
}

/* PRODUCT INFO */
.product-info {
  padding: 16px 3px 0;
}

.product-category {
  color: #a27b45;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
}

.product-name {
  display: block;
  margin: 8px 0;
  color: #29231f;
  font-family: Georgia, serif;
  font-size: 17px;
  text-decoration: none;
  transition: .2s;
}

.product-name:hover {
  color: #a27b45;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-price strong {
  color: #29231f;
  font-size: 16px;
}

/* EMPTY */
.empty-products {
  text-align: center;
  padding: 75px 15px;
  color: #777;
}

.empty-products > i {
  font-size: 42px;
  color: #c9a46a;
}

.empty-products h3 {
  color: #29231f;
  font-family: Georgia, serif;
  margin-top: 15px;
}

.empty-products button {
  margin-top: 15px;
  background: #29231f;
  color: #fff;
  border: 0;
  padding: 12px 24px;
  cursor: pointer;
}

/* TOAST */
.shop-toast {
  position: fixed;
  z-index: 9999;
  right: 25px;
  bottom: 25px;
  padding: 15px 22px;
  background: #252b25;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 8px 30px rgba(0,0,0,.2);
  font-size: 14px;
}

.shop-toast i {
  color: #7bd49a;
  margin-right: 8px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all .3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

/* RESPONSIVE */
@media (max-width: 1000px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .product-image {
    height: 310px;
  }
}

@media (max-width: 700px) {
  .shop-container {
    padding: 45px 16px 60px;
  }

  .shop-heading {
    align-items: start;
    flex-direction: column;
    gap: 12px;
  }

  .shop-heading h2 {
    font-size: 31px;
  }

  .shop-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .sort-box {
    align-self: flex-end;
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 13px;
  }

  .product-image {
    height: 245px;
  }

  .product-name {
    font-size: 15px;
  }

  .add-cart-btn {
    transform: translateY(0);
    padding: 10px 5px;
    font-size: 11px;
  }

  .quick-view {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 380px) {
  .product-image {
    height: 205px;
  }

  .product-price {
    gap: 5px;
  }

  .product-price strong {
    font-size: 14px;
  }
}
</style>
