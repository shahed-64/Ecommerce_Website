
<template>
  <section class="trending-section">
    <div class="section-container">

      <!-- SECTION HEADER -->
      <div class="section-header">
        <div>
          <span class="section-subtitle">OUR COLLECTION</span>
          <h2>Trending Products</h2>
          <p>Discover our most popular fashion collections</p>
        </div>

        <RouterLink to="/shop" class="view-all-btn">
          View All Products
          <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <!-- PRODUCT GRID -->
      <div class="product-grid">

        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image-area">

            <span
              v-if="product.discount"
              class="discount-badge"
            >
              -{{ product.discount }}%
            </span>

            <button
              class="wishlist-btn"
              :class="{ active: wishlist.includes(product.id) }"
              @click="toggleWishlist(product)"
              aria-label="Add to wishlist"
            >
              <i :class="wishlist.includes(product.id) ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
            </button>

            <RouterLink
              :to="`/product/${product.id}`"
              class="product-image-link"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="product-image"
                loading="lazy"
              />
            </RouterLink>

            <div class="product-actions">
              <button
                @click="openQuickView(product)"
                aria-label="Quick view"
                title="Quick View"
              >
                <i class="bi bi-eye"></i>
              </button>

              <RouterLink
                :to="`/product/${product.id}`"
                aria-label="View product details"
                title="View Details"
              >
                <i class="bi bi-box-arrow-up-right"></i>
              </RouterLink>
            </div>
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

            <div class="product-rating">
              <span class="stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
              </span>
              <span class="rating-count">({{ product.reviews }})</span>
            </div>

            <div class="product-price">
              <strong>৳{{ product.price.toLocaleString('en-BD') }}</strong>
              <del v-if="product.oldPrice">
                ৳{{ product.oldPrice.toLocaleString('en-BD') }}
              </del>
            </div>

            <button
              class="add-cart-btn"
              @click="addToCart(product)"
            >
              <i class="bi bi-bag-plus"></i>
              Add to Cart
            </button>

          </div>
        </div>

      </div>
    </div>

    <!-- QUICK VIEW MODAL -->
    <div
      v-if="selectedProduct"
      class="quick-view-overlay"
      @click.self="closeQuickView"
    >
      <div class="quick-view-modal">

        <button
          class="modal-close"
          @click="closeQuickView"
          aria-label="Close"
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="quick-view-content">

          <div class="quick-view-image">
            <img
              :src="selectedProduct.image"
              :alt="selectedProduct.name"
            />
          </div>

          <div class="quick-view-details">
            <span class="product-category">
              {{ selectedProduct.category }}
            </span>

            <h2>{{ selectedProduct.name }}</h2>

            <div class="product-rating">
              <span class="stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
              </span>
              <span class="rating-count">
                ({{ selectedProduct.reviews }} Reviews)
              </span>
            </div>

            <div class="quick-view-price">
              <strong>
                ৳{{ selectedProduct.price.toLocaleString('en-BD') }}
              </strong>
              <del v-if="selectedProduct.oldPrice">
                ৳{{ selectedProduct.oldPrice.toLocaleString('en-BD') }}
              </del>
            </div>

            <p class="quick-description">
              {{ selectedProduct.description }}
            </p>

            <div class="quantity-selector">
              <span>Quantity:</span>

              <div class="quantity-control">
                <button @click="decreaseQuantity">−</button>
                <span>{{ quantity }}</span>
                <button @click="increaseQuantity">+</button>
              </div>
            </div>

            <button
              class="quick-add-btn"
              @click="addToCart(selectedProduct, quantity)"
            >
              <i class="bi bi-bag-plus"></i>
              Add to Cart
            </button>

            <RouterLink
              :to="`/product/${selectedProduct.id}`"
              class="details-link"
              @click="closeQuickView"
            >
              View Full Details
              <i class="bi bi-arrow-right"></i>
            </RouterLink>
          </div>

        </div>
      </div>
    </div>

    <!-- CART MESSAGE -->
    <Transition name="toast">
      <div v-if="cartMessage" class="cart-toast">
        <i class="bi bi-check-circle-fill"></i>
        {{ cartMessage }}
      </div>
    </Transition>

  </section>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const emit = defineEmits([
  'add-to-cart',
  'wishlist'
])

const wishlist = ref([])
const selectedProduct = ref(null)
const quantity = ref(1)
const cartMessage = ref('')
let messageTimer = null

const products = [
  {
    id: 1,
    name: 'Premium Silk Saree',
    category: 'Saree',
    price: 2850,
    oldPrice: 3500,
    discount: 19,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    description: 'Beautiful traditional silk saree with an elegant design. Perfect for festivals, weddings and special occasions.'
  },
  {
    id: 2,
    name: 'Elegant Three Piece',
    category: 'Three Piece',
    price: 1950,
    oldPrice: 2400,
    discount: 19,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?auto=format&fit=crop&w=800&q=85',
    description: 'A stylish three-piece collection designed for comfort and elegance. A beautiful choice for everyday and special occasions.'
  },
  {
    id: 3,
    name: 'Premium Panjabi',
    category: 'Panjabi',
    price: 1650,
    oldPrice: 2000,
    discount: 18,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=85',
    description: 'A smart and comfortable panjabi with a timeless look. Perfect for celebrations and traditional occasions.'
  },
  {
    id: 4,
    name: 'Stylish Fashion Bag',
    category: 'Accessories',
    price: 1250,
    oldPrice: 1500,
    discount: 17,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    description: 'A fashionable bag with an elegant finish. A versatile accessory for your everyday style.'
  },
  {
    id: 5,
    name: 'Beauty Essentials Set',
    category: 'Cosmetics',
    price: 950,
    oldPrice: 1200,
    discount: 21,
    reviews: 21,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85',
    description: 'A collection of beauty essentials selected to complement your everyday beauty routine.'
  },
  {
    id: 6,
    name: 'Classic Fashion Outfit',
    category: 'Fashion',
    price: 2200,
    oldPrice: 2600,
    discount: 15,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85',
    description: 'A modern fashion collection combining comfort and a stylish appearance.'
  },
  {
    id: 7,
    name: 'Elegant Women Outfit',
    category: 'Women Fashion',
    price: 1850,
    oldPrice: 2200,
    discount: 16,
    reviews: 17,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85',
    description: 'A beautiful outfit for women with a graceful and contemporary design.'
  },
  {
    id: 8,
    name: 'Premium Casual Wear',
    category: 'Casual Wear',
    price: 1450,
    oldPrice: 1750,
    discount: 17,
    reviews: 14,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85',
    description: 'Comfortable casual wear with a clean and fashionable design for everyday use.'
  }
]

function toggleWishlist(product) {
  const index = wishlist.value.indexOf(product.id)

  if (index === -1) {
    wishlist.value.push(product.id)
    emit('wishlist', { product, added: true })
  } else {
    wishlist.value.splice(index, 1)
    emit('wishlist', { product, added: false })
  }
}

function openQuickView(product) {
  selectedProduct.value = product
  quantity.value = 1
  document.body.style.overflow = 'hidden'
}

function closeQuickView() {
  selectedProduct.value = null
  document.body.style.overflow = ''
}

function increaseQuantity() {
  quantity.value++
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function addToCart(product, qty = 1) {
  emit('add-to-cart', {
    product,
    quantity: qty
  })

  cartMessage.value = `${product.name} added to cart`

  if (messageTimer) {
    clearTimeout(messageTimer)
  }

  messageTimer = setTimeout(() => {
    cartMessage.value = ''
  }, 2500)

  closeQuickView()
}

onUnmounted(() => {
  document.body.style.overflow = ''
  if (messageTimer) {
    clearTimeout(messageTimer)
  }
})
</script>

<style scoped>
.trending-section {
  width: 100%;
  padding: 65px 4%;
  background: #fff;
}

.section-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 32px;
}

.section-subtitle {
  display: block;
  margin-bottom: 9px;
  color: #bd914c;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.section-header h2 {
  margin: 0 0 8px;
  color: #222;
  font-size: 32px;
  font-weight: 700;
}

.section-header p {
  margin: 0;
  color: #777;
  font-size: 14px;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 11px 18px;
  border: 1px solid #bd914c;
  border-radius: 4px;
  color: #a77c35;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: 0.3s;
}

.view-all-btn:hover {
  background: #bd914c;
  color: #fff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 25px;
}

.product-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #eee;
  background: #fff;
  transition: 0.3s ease;
}

.product-card:hover {
  border-color: #e1d0b1;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.product-image-area {
  position: relative;
  overflow: hidden;
  background: #f7f5f2;
  aspect-ratio: 3 / 3.6;
}

.product-image-link {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.product-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-image {
  transform: scale(1.09);
}

.discount-badge {
  position: absolute;
  top: 13px;
  left: 13px;
  z-index: 2;
  padding: 6px 10px;
  background: #b84949;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #555;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;
}

.wishlist-btn:hover,
.wishlist-btn.active {
  background: #bd914c;
  color: #fff;
}

.product-actions {
  position: absolute;
  bottom: 15px;
  left: 50%;
  z-index: 2;
  display: flex;
  gap: 9px;
  opacity: 0;
  transform: translate(-50%, 15px);
  transition: 0.3s ease;
}

.product-card:hover .product-actions {
  opacity: 1;
  transform: translate(-50%, 0);
}

.product-actions button,
.product-actions a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 39px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #333;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
}

.product-actions button:hover,
.product-actions a:hover {
  background: #bd914c;
  color: #fff;
}

.product-info {
  padding: 17px 15px 18px;
}

.product-category {
  display: block;
  margin-bottom: 7px;
  color: #a77c35;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-name {
  display: block;
  min-height: 42px;
  margin-bottom: 8px;
  color: #252525;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  line-height: 1.5;
}

.product-name:hover {
  color: #bd914c;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
}

.stars {
  color: #e5a83c;
  font-size: 11px;
}

.rating-count {
  color: #888;
  font-size: 11px;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
}

.product-price strong {
  color: #222;
  font-size: 17px;
  font-weight: 700;
}

.product-price del {
  color: #999;
  font-size: 12px;
}

.add-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding: 11px;
  border: 1px solid #bd914c;
  background: #fff;
  color: #a77c35;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.add-cart-btn:hover {
  background: #bd914c;
  color: #fff;
}

/* QUICK VIEW */

.quick-view-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.65);
}

.quick-view-modal {
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
}

.modal-close {
  position: absolute;
  top: 13px;
  right: 13px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 37px;
  border: none;
  border-radius: 50%;
  background: #f3f3f3;
  color: #333;
  cursor: pointer;
}

.quick-view-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.quick-view-image {
  min-height: 450px;
  background: #f7f5f2;
}

.quick-view-image img {
  width: 100%;
  height: 100%;
  min-height: 450px;
  object-fit: cover;
}

.quick-view-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 45px 35px;
}

.quick-view-details h2 {
  margin-bottom: 14px;
  color: #222;
  font-size: 27px;
  font-weight: 700;
}

.quick-view-price {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
}

.quick-view-price strong {
  color: #222;
  font-size: 25px;
}

.quick-view-price del {
  color: #999;
  font-size: 15px;
}

.quick-description {
  margin-bottom: 25px;
  color: #777;
  font-size: 14px;
  line-height: 1.8;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 22px;
  color: #444;
  font-size: 14px;
  font-weight: 600;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
}

.quantity-control button {
  width: 35px;
  height: 34px;
  border: none;
  background: #f7f7f7;
  color: #333;
  font-size: 19px;
  cursor: pointer;
}

.quantity-control span {
  min-width: 38px;
  text-align: center;
}

.quick-add-btn {
  width: 100%;
  padding: 14px;
  border: none;
  background: #bd914c;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.quick-add-btn:hover {
  background: #a77c35;
}

.details-link {
  display: inline-block;
  margin-top: 18px;
  color: #a77c35;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
}

/* CART TOAST */

.cart-toast {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 22px;
  background: #222;
  color: #fff;
  font-size: 13px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.cart-toast i {
  color: #7acb85;
  font-size: 18px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .trending-section {
    padding: 45px 3%;
  }

  .section-header h2 {
    font-size: 26px;
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
  }

  .product-info {
    padding: 13px 11px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-price strong {
    font-size: 15px;
  }

  .product-actions {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  .quick-view-content {
    grid-template-columns: 1fr;
  }

  .quick-view-image,
  .quick-view-image img {
    min-height: 280px;
    max-height: 350px;
  }

  .quick-view-details {
    padding: 25px;
  }
}

@media (max-width: 480px) {
  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-header h2 {
    font-size: 23px;
  }

  .view-all-btn {
    padding: 9px 13px;
  }

  .product-grid {
    gap: 12px;
  }

  .product-image-area {
    aspect-ratio: 3 / 3.8;
  }

  .product-info {
    padding: 11px 9px;
  }

  .product-category {
    font-size: 9px;
  }

  .product-name {
    min-height: 38px;
    font-size: 12px;
  }

  .product-rating {
    gap: 4px;
  }

  .stars {
    font-size: 9px;
  }

  .rating-count {
    font-size: 9px;
  }

  .product-price {
    gap: 5px;
  }

  .product-price strong {
    font-size: 14px;
  }

  .product-price del {
    font-size: 10px;
  }

  .add-cart-btn {
    padding: 9px 5px;
    font-size: 11px;
  }

  .quick-view-overlay {
    padding: 10px;
  }

  .quick-view-details h2 {
    font-size: 22px;
  }
}
</style>
