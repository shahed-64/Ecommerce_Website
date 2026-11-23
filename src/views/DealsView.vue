<template>
  <div class="deals-page">
    <HeaderView :cart-count="cartCount" :cart-total="cartTotal" />

    <main>
      <!-- DEALS HERO -->
      <section class="deals-hero">
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <span class="hero-label">EXCLUSIVE OFFERS</span>
          <h1>Special Deals<br />Just For You</h1>
          <p>
            Discover beautiful collections at irresistible prices.
            Your favourite styles, now at special discounts.
          </p>

          <RouterLink to="/shop" class="hero-btn">
            EXPLORE DEALS <i class="bi bi-arrow-right"></i>
          </RouterLink>

          <div class="hero-discount" v-if="maxDiscount > 0">
            <strong>UP TO</strong>
            <span>{{ maxDiscount }}%</span>
            <small>OFF</small>
          </div>
        </div>
      </section>

      <!-- DEALS INTRO -->
      <section class="deals-intro">
        <span class="section-subtitle">DON'T MISS OUT</span>
        <h2>Exclusive Offers</h2>
        <p>
          Explore our handpicked fashion collection with amazing discounts.
        </p>
      </section>

      <!-- DISCOUNT PRODUCTS -->
      <section class="deals-products">

        <div class="section-heading">
          <div></div>

          <RouterLink to="/shop" class="view-all">
            VIEW ALL PRODUCTS <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>

        <div v-if="loading" class="deals-message">
          <i class="bi bi-arrow-repeat"></i>
          Loading deals...
        </div>

        <div v-else-if="errorMessage" class="deals-message error-message">
          {{ errorMessage }}
        </div>

        <div v-else-if="dealProducts.length === 0" class="deals-message">
          <i class="bi bi-tags"></i>
          <h3>No Special Deals Available</h3>
          <p>There are currently no products with discounts.</p>
          <RouterLink to="/shop" class="empty-shop-btn">
            EXPLORE ALL PRODUCTS
          </RouterLink>
        </div>

        <div v-else class="product-grid">
          <div
            v-for="product in dealProducts"
            :key="product.cartKey"
            class="product-card"
          >
            <div class="product-image">
              <RouterLink :to="`/product/${product.id}`">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                />
                <div v-else class="no-product-image">
                  <i class="bi bi-image"></i>
                </div>
              </RouterLink>

              <span class="discount-badge">
                {{ product.discountPercentage }}% OFF
              </span>

              <button
                class="quick-view"
                @click="goToProduct(product.id)"
                aria-label="View product"
              >
                <i class="bi bi-eye"></i>
              </button>

              <button
                class="add-cart-btn"
                @click="addProduct(product)"
              >
                <i class="bi bi-bag-plus"></i>
                ADD TO CART
              </button>
            </div>

            <div class="product-info">
              <span class="product-category">{{ product.category }}</span>

              <RouterLink
                :to="`/product/${product.id}`"
                class="product-name"
              >
                {{ product.name }}
              </RouterLink>

              <small
                v-if="product.selectedColor || product.selectedSize"
                class="variant-label"
              >
                <span v-if="product.selectedColor">
                  {{ product.selectedColor }}
                </span>
                <span v-if="product.selectedColor && product.selectedSize">
                  |
                </span>
                <span v-if="product.selectedSize">
                  {{ product.selectedSize }}
                </span>
              </small>

              <div class="product-price">
                <strong>
                  ৳{{ product.price.toLocaleString('en-US') }}
                </strong>
                <del>
                  ৳{{ product.oldPrice.toLocaleString('en-US') }}
                </del>
              </div>

              <span class="you-save">
                You save ৳{{ product.discountAmount.toLocaleString('en-US') }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- PROMO BANNER -->
      <section class="promo-banner">
        <div class="promo-image"></div>

        <div class="promo-content">
          <span>THE FESTIVE COLLECTION</span>
          <h2>Make Every Occasion Special</h2>
          <p>
            Find timeless elegance and beautiful styles
            for every memorable moment.
          </p>

          <RouterLink to="/shop" class="promo-btn">
            SHOP COLLECTION <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>
      </section>
    </main>

    <FooterView />

    <!-- TOAST -->
    <Transition name="toast">
      <div v-if="toastMessage" class="deal-toast">
        <i class="bi bi-check-circle-fill"></i>
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { useCart } from '../stores/cart'

const router = useRouter()

const {
  cartCount,
  cartTotal,
  addToCart
} = useCart()

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const toastMessage = ref('')
const loading = ref(true)
const errorMessage = ref('')

const dealProducts = ref([])

let toastTimer = null

const maxDiscount = computed(() => {
  if (!dealProducts.value.length) return 0

  return Math.max(
    ...dealProducts.value.map(product => product.discountPercentage)
  )
})

function extractList(response) {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.data?.data)) return response.data.data
  return []
}

function fixImageUrl(url) {
  if (!url) return ''

  return url.replace(
    'http://localhost/',
    'http://127.0.0.1:8000/'
  )
}

// Calculate discount and create a deal card
function createDealProduct(item, variant = null) {
  const salePrice = Number(
    variant?.sale_price || item.sale_price || 0
  )

  // Prefer variant discount.
  // If variant discount is zero, use product-level discount.
  const variantDiscount = Number(variant?.discount || 0)
  const productDiscount = Number(item.discount || 0)

  const discountAmount = variantDiscount > 0
    ? variantDiscount
    : productDiscount

  if (
    !item.id ||
    salePrice <= 0 ||
    discountAmount <= 0 ||
    discountAmount >= salePrice
  ) {
    return null
  }

  const finalPrice = salePrice - discountAmount

  const discountPercentage = Math.round(
    (discountAmount / salePrice) * 100
  )

  return {
    id: item.id,
    variant_id: variant?.id || null,

    cartKey: variant?.id
      ? `${item.id}-variant-${variant.id}`
      : `${item.id}-product`,

    name: item.name,
    category: item.category?.name || 'Collection',
    categoryId: item.category_id || item.category?.id,

    price: finalPrice,
    oldPrice: salePrice,
    discountAmount,
    discountPercentage,

    image: fixImageUrl(item.image_url),

    selectedColor: variant?.color || '',
    selectedSize: variant?.size || '',
    sku: variant?.sku || item.sku || ''
  }
}

// Load discounted products
async function fetchDeals() {
  loading.value = true
  errorMessage.value = ''

  try {
    const productResponse = await fetch(
      `${API_BASE_URL}/storefront/products?per_page=100`
    )

    if (!productResponse.ok) {
      throw new Error('Unable to load deals. Please try again.')
    }

    const productData = await productResponse.json()

    const products = extractList(productData)
    const deals = []

    products.forEach(item => {
      // Skip unavailable products
      if (!item.id || item.is_available === false) {
        return
      }

      const variants = Array.isArray(item.variants)
        ? item.variants
        : []

      if (variants.length > 0) {
        // Each available discounted variant becomes a separate deal
        variants.forEach(variant => {
          if (variant.is_available === false) {
            return
          }

          const deal = createDealProduct(item, variant)

          if (deal) {
            deals.push(deal)
          }
        })
      } else {
        // Products without variants use product-level discount
        const deal = createDealProduct(item)

        if (deal) {
          deals.push(deal)
        }
      }
    })

    dealProducts.value = deals

  } catch (error) {
    console.error('Deals loading error:', error)
    errorMessage.value = error.message || 'Failed to load deals.'
  } finally {
    loading.value = false
  }
}

// Toast notification
function showToast(message) {
  toastMessage.value = message

  clearTimeout(toastTimer)

  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

// Add the correct discounted variant to cart
function addProduct(product) {
  addToCart(
    {
      id: product.id,
      variant_id: product.variant_id,

      name: product.name,
      category: product.category,
      image: product.image,

      price: product.price,

      selectedColor: product.selectedColor,
      selectedSize: product.selectedSize,
      sku: product.sku
    },
    1
  )

  showToast(`${product.name} added to cart!`)
}

function goToProduct(id) {
  router.push(`/product/${id}`)
}

onMounted(() => {
  fetchDeals()
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.deals-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #fff;
  color: #292522;
}

/* HERO */

.deals-hero {
  min-height: 530px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 70px 9%;
  background:
    url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90')
    center 48% / cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(30, 19, 17, .85),
    rgba(30, 19, 17, .50),
    rgba(30, 19, 17, .05)
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 650px;
  color: #fff;
}

.hero-label,
.section-subtitle {
  display: inline-block;
  color: #bd955e;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 16px;
}

.hero-content h1 {
  font-family: Georgia, serif;
  font-size: clamp(42px, 5.5vw, 70px);
  line-height: 1.12;
  font-weight: 500;
  margin: 0 0 20px;
}

.hero-content p {
  max-width: 490px;
  color: #eee5df;
  font-size: 15px;
  line-height: 1.9;
  margin-bottom: 30px;
}

.hero-btn,
.promo-btn {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  background: #bd955e;
  color: #fff;
  text-decoration: none;
  padding: 15px 27px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: .3s;
}

.hero-btn:hover,
.promo-btn:hover {
  background: #fff;
  color: #292522;
}

.hero-discount {
  position: absolute;
  left: min(690px, 75vw);
  top: 50%;
  transform: translateY(-50%);
  width: 150px;
  height: 150px;
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(189,149,94,.9);
  color: #fff;
  text-align: center;
}

.hero-discount strong,
.hero-discount small {
  font-size: 11px;
  letter-spacing: 2px;
}

.hero-discount span {
  font-size: 43px;
  font-weight: 700;
  line-height: 1.1;
}

/* INTRO */

.deals-intro {
  text-align: center;
  padding: 75px 20px 35px;
}

.deals-intro h2,
.section-heading h2 {
  font-family: Georgia, serif;
  font-size: 38px;
  font-weight: 500;
  margin: 0 0 12px;
}

.deals-intro p {
  color: #888;
  font-size: 14px;
  margin: 0;
}

/* PRODUCTS */

.deals-products {
  background: #f9f7f4;
  padding: 35px 25px 85px;
}

.section-heading {
  max-width: 1200px;
  margin: 0 auto 35px;
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.section-heading h2 {
  margin: 0;
}

.section-heading .section-subtitle {
  margin-bottom: 8px;
}

.view-all {
  color: #8d6a40;
  text-decoration: none;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

.product-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.product-card {
  background: #fff;
  min-width: 0;
}

.product-image {
  position: relative;
   height: 260px;
  overflow: hidden;
  background: #f0ece7;
}

.product-image > a {
  display: block;
  width: 100%;
  height: 100%;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s;
}

.no-product-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 35px;
}

.product-card:hover .product-image img {
  transform: scale(1.07);
}

.discount-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #9b3935;
  color: #fff;
  padding: 7px 10px;
  font-size: 10px;
  font-weight: 700;
}

.quick-view {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #292522;
  cursor: pointer;
  transition: .3s;
}

.quick-view:hover {
  background: #bd955e;
  color: #fff;
}

.add-cart-btn {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  width: calc(100% - 24px);
  border: none;
  padding: 13px 8px;
  background: #292522;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: .3s;
}

.product-card:hover .add-cart-btn {
  opacity: 1;
  transform: translateY(0);
}

.add-cart-btn:hover {
  background: #bd955e;
}

.product-info {
  padding: 17px 15px 20px;
}

.product-category {
  color: #a77d48;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-name {
  display: block;
  margin: 7px 0;
  color: #292522;
  font-family: Georgia, serif;
  font-size: 17px;
  text-decoration: none;
}

.product-name:hover {
  color: #a77d48;
}

.variant-label {
  display: block;
  color: #888;
  font-size: 11px;
  margin: 4px 0;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.product-price strong {
  color: #292522;
  font-size: 17px;
}

.product-price del {
  color: #aaa;
  font-size: 13px;
}

.you-save {
  display: inline-block;
  margin-top: 7px;
  color: #45815a;
  font-size: 11px;
  font-weight: 600;
}

/* LOADING / EMPTY */

.deals-message {
  max-width: 1200px;
  min-height: 180px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #888;
  font-size: 14px;
  gap: 10px;
}

.deals-message > i {
  font-size: 30px;
  color: #bd955e;
}

.deals-message h3 {
  color: #292522;
  font-family: Georgia, serif;
  font-size: 23px;
  font-weight: 500;
  margin: 5px 0 0;
}

.deals-message p {
  margin: 0;
}

.error-message {
  color: #b33;
}

.empty-shop-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 12px 20px;
  background: #292522;
  color: #fff;
  text-decoration: none;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* PROMO */

.promo-banner {
  min-height: 370px;
  position: relative;
  margin: 85px auto;
  max-width: 1200px;
  display: flex;
  align-items: center;
  background: #eee8df;
  overflow: hidden;
}

.promo-image {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(30,23,19,.85), rgba(30,23,19,.25)),
    url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=90')
    center 40% / cover no-repeat;
}

.promo-content {
  position: relative;
  z-index: 1;
  padding: 55px 8%;
  max-width: 650px;
  color: #fff;
}

.promo-content > span {
  color: #d6b17f;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.promo-content h2 {
  font-family: Georgia, serif;
  font-size: 38px;
  font-weight: 500;
  margin: 15px 0;
}

.promo-content p {
  color: #eee;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 25px;
}

/* TOAST */

.deal-toast {
  position: fixed;
  z-index: 9999;
  right: 25px;
  bottom: 25px;
  padding: 16px 23px;
  background: #252b27;
  color: #fff;
  box-shadow: 0 8px 30px rgba(0,0,0,.2);
  font-size: 13px;
}

.deal-toast i {
  color: #79c78b;
  margin-right: 8px;
}

.toast-enter-active,
.toast-leave-active {
  transition: .3s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

/* RESPONSIVE */

@media (max-width: 1000px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-discount {
    left: auto;
    right: 7%;
    width: 120px;
    height: 120px;
  }

  .hero-discount span {
    font-size: 35px;
  }
}

@media (max-width: 600px) {
  .deals-hero {
    min-height: 480px;
    padding: 55px 25px;
    background-position: 60% center;
  }

  .hero-content h1 {
    font-size: 43px;
  }

  .hero-content p {
    max-width: 310px;
    font-size: 13px;
  }

  .hero-discount {
    width: 85px;
    height: 85px;
    top: auto;
    bottom: 25px;
    right: 22px;
    transform: none;
  }

  .hero-discount span {
    font-size: 25px;
  }

  .hero-discount strong,
  .hero-discount small {
    font-size: 8px;
  }

  .deals-intro {
    padding-top: 55px;
  }

  .deals-intro h2,
  .section-heading h2 {
    font-size: 30px;
  }

  .deals-products {
    padding: 25px 12px 55px;
  }

  .section-heading {
    padding: 0 5px;
    align-items: center;
  }

  .view-all {
    font-size: 9px;
  }

  .product-grid {
    gap: 12px;
  }

  .product-image {
    height: 220px;
  }

  .product-info {
    padding: 12px 9px 15px;
  }

  .product-name {
    font-size: 15px;
  }

  .product-price {
    gap: 6px;
  }

  .product-price strong {
    font-size: 14px;
  }

  .product-price del {
    font-size: 11px;
  }

  .add-cart-btn {
    opacity: 1;
    transform: none;
    font-size: 9px;
    padding: 10px 5px;
  }

  .promo-banner {
    margin: 50px 12px;
    min-height: 350px;
  }

  .promo-content {
    padding: 35px 25px;
  }

  .promo-content h2 {
    font-size: 30px;
  }

  .promo-content p {
    font-size: 12px;
  }

  .deal-toast {
    left: 15px;
    right: 15px;
    bottom: 15px;
    text-align: center;
  }
}
.product-info {
  padding: 12px 15px 12px;
}

.product-name {
  margin: 4px 0;
}

.product-price {
  margin-top: 6px;
}

.you-save {
  margin-top: 4px;
}
</style>