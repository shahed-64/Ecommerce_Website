
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
            <span v-if="product.discount" class="image-discount">
              -{{ product.discount }}% OFF
            </span>

            <button class="image-expand" @click="showImageModal = true">
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
          <div class="product-brand">BASTRO KUTIR EXCLUSIVE</div>

          <h1>{{ product.name }}</h1>

          <div class="rating-row">
            <div class="stars">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </div>
            <span>4.8</span>
            <span class="rating-divider">|</span>
            <span>{{ product.reviews }} Customer Reviews</span>
          </div>

          <div class="price-row">
            <strong>৳{{ product.price.toLocaleString() }}</strong>
            <del v-if="product.oldPrice">
              ৳{{ product.oldPrice.toLocaleString() }}
            </del>
            <span v-if="product.discount" class="save-badge">
              Save {{ product.discount }}%
            </span>
          </div>

          <p class="product-description">
            {{ product.description }}
          </p>

          <div class="stock-status">
            <i class="bi bi-check-circle-fill"></i>
            In Stock - Ready to Ship
          </div>

          <div class="option-group">
            <div class="option-heading">
              Select Color
              <span>{{ selectedColor }}</span>
            </div>

            <div class="color-options">
              <button
                v-for="color in colors"
                :key="color.name"
                :title="color.name"
                :class="{ selected: selectedColor === color.name }"
                :style="{ background: color.value }"
                @click="selectedColor = color.name"
              ></button>
            </div>
          </div>

          <div class="option-group">
            <div class="option-heading">
              Select Size
              <span>{{ selectedSize || 'Choose a size' }}</span>
            </div>

            <div class="size-options">
              <button
                v-for="size in sizes"
                :key="size"
                :class="{ selected: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="purchase-row">
            <div class="quantity-control">
              <button @click="quantity = Math.max(1, quantity - 1)">
                <i class="bi bi-dash"></i>
              </button>
              <span>{{ quantity }}</span>
              <button @click="quantity++">
                <i class="bi bi-plus"></i>
              </button>
            </div>

            <button class="add-to-cart" @click="handleAddToCart">
              <i class="bi bi-bag-plus"></i>
              Add to Cart
            </button>
          </div>

          <button class="buy-now" @click="handleBuyNow">
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
            <p><span>SKU:</span> BK-{{ product.id }}</p>
            <p><span>Category:</span> {{ product.category }}</p>
            <p><span>Brand:</span> Bastro Kutir</p>
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
            <p>{{ product.description }}</p>
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
              <strong>Bastro Kutir</strong>
            </div>
            <div class="specification-row">
              <span>Availability</span>
              <strong>In Stock</strong>
            </div>
          </div>

          <div v-if="activeTab === 'shipping'">
            <h3>Delivery Information</h3>
            <p>We aim to deliver your order safely and conveniently.</p>
            <p>Cash on Delivery is available according to delivery location.</p>
            <p>Please contact our customer support for return and exchange assistance.</p>
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
            <RouterLink :to="`/product/${item.id}`" class="related-image">
              <img :src="item.image" :alt="item.name" />
              <span v-if="item.discount">-{{ item.discount }}%</span>
            </RouterLink>

            <div class="related-info">
              <small>{{ item.category }}</small>
              <RouterLink :to="`/product/${item.id}`">
                {{ item.name }}
              </RouterLink>
              <strong>৳{{ item.price.toLocaleString() }}</strong>
            </div>
          </article>
        </div>
      </section>
    </main>

    <!-- IMAGE MODAL -->
    <Transition name="modal">
      <div
        v-if="showImageModal"
        class="image-modal"
        @click.self="showImageModal = false"
      >
        <button class="modal-close" @click="showImageModal = false">
          <i class="bi bi-x-lg"></i>
        </button>
        <img :src="product.images[activeImage]" :alt="product.name" />
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

const products = [
  {
    id: 101,
    name: 'Premium Silk Saree',
    category: 'Saree',
    price: 2850,
    oldPrice: 3500,
    discount: 19,
    reviews: 28,
    description: 'An elegant silk saree designed to make every occasion special. Its beautiful traditional look adds a timeless touch to your wardrobe.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 102,
    name: 'Elegant Traditional Saree',
    category: 'Saree',
    price: 2250,
    oldPrice: 2800,
    discount: 20,
    reviews: 19,
    description: 'A graceful traditional saree for celebrations, family gatherings and special occasions.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 103,
    name: 'Classic Embroidered Three Piece',
    category: 'Three Piece',
    price: 3200,
    oldPrice: 3800,
    discount: 16,
    reviews: 35,
    description: 'A beautiful embroidered three piece collection with an elegant design for your everyday and festive wardrobe.',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93a0?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93a0?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 104,
    name: 'Premium Cotton Panjabi',
    category: 'Panjabi',
    price: 1650,
    oldPrice: 1950,
    discount: 15,
    reviews: 16,
    description: 'A comfortable cotton panjabi with a smart traditional look. Perfect for everyday wear and special occasions.',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 105,
    name: 'Traditional Cotton Lungi',
    category: 'Lungi',
    price: 750,
    oldPrice: 900,
    discount: 17,
    reviews: 22,
    description: 'A comfortable traditional cotton lungi for everyday use.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 106,
    name: 'Premium Printed Fabric',
    category: 'Fabric',
    price: 450,
    oldPrice: 550,
    discount: 18,
    reviews: 12,
    description: 'Beautiful printed fabric for creating your own unique style.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 107,
    name: 'Designer Party Wear Saree',
    category: 'Saree',
    price: 3950,
    oldPrice: 4500,
    discount: 12,
    reviews: 31,
    description: 'A stunning designer saree for parties, celebrations and memorable occasions.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85'
    ]
  },
  {
    id: 108,
    name: 'Modern Casual Three Piece',
    category: 'Three Piece',
    price: 2450,
    oldPrice: 2900,
    discount: 16,
    reviews: 24,
    description: 'A modern casual three piece collection designed for comfort and everyday elegance.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85'
    ]
  }
]

// Home page product IDs 1-8 map to the same demo products 101-108.
const productId = computed(() => {
  const id = Number(route.params.id)
  return id >= 1 && id <= 8 ? id + 100 : id
})

const product = computed(() => {
  return products.find(item => item.id === productId.value) || products[0]
})

const relatedProducts = computed(() => {
  return products
    .filter(item => item.id !== product.value.id)
    .filter(item => item.category === product.value.category)
    .slice(0, 4)
    .concat(
      products
        .filter(item =>
          item.id !== product.value.id &&
          item.category !== product.value.category
        )
        .slice(0, Math.max(0, 4 - products.filter(item =>
          item.id !== product.value.id &&
          item.category === product.value.category
        ).length))
    )
    .slice(0, 4)
})

const activeImage = ref(0)
const selectedColor = ref('Maroon')
const selectedSize = ref('M')
const quantity = ref(1)
const activeTab = ref('description')
const showImageModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const zoomStyle = ref({})

const colors = [
  { name: 'Maroon', value: '#7b1f32' },
  { name: 'Black', value: '#242424' },
  { name: 'Blue', value: '#344d78' },
  { name: 'Green', value: '#456b4c' },
  { name: 'Pink', value: '#d58e9f' }
]

const sizes = ['S', 'M', 'L', 'XL', 'XXL']

watch(
  () => route.params.id,
  () => {
    activeImage.value = 0
    quantity.value = 1
    selectedColor.value = 'Maroon'
    selectedSize.value = 'M'
    activeTab.value = 'description'
    showImageModal.value = false
  }
)

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

function notify(message) {
  toastMessage.value = message
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 2500)
}

function handleAddToCart() {
  addToCart(
    {
      ...product.value,
      id: Number(route.params.id),
      selectedColor: selectedColor.value,
      selectedSize: selectedSize.value
    },
    quantity.value
  )

  notify(`${product.value.name} added to cart!`)
}

function handleBuyNow() {
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
