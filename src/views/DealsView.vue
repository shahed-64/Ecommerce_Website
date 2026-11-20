
<template>
  <div class="deals-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

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

          <div class="hero-discount">
            <strong>UP TO</strong>
            <span>50%</span>
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

      <!-- DEAL CATEGORIES -->
      <section class="deal-categories">
        <RouterLink
          v-for="category in dealCategories"
          :key="category.name"
          :to="{ path: '/shop', query: { category: category.filter } }"
          class="deal-category"
        >
          <div class="category-image">
            <img :src="category.image" :alt="category.name" />
            <span>{{ category.discount }}</span>
          </div>

          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
          <span class="category-link">
            SHOP NOW <i class="bi bi-arrow-right"></i>
          </span>
        </RouterLink>
      </section>

      <!-- PRODUCTS -->
      <section class="deals-products">
        <div class="section-heading">
          <div>
            <span class="section-subtitle">BEST SAVINGS</span>
            <h2>Hot Deals</h2>
          </div>

          <RouterLink to="/shop" class="view-all">
            VIEW ALL PRODUCTS <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>

        <div class="product-grid">
          <div
            v-for="product in dealProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="product-image">
              <RouterLink :to="`/product/${product.id}`">
                <img :src="product.image" :alt="product.name" />
              </RouterLink>

              <span class="discount-badge">
                {{ product.discount }}% OFF
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

              <div class="product-rating">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
                <span>({{ product.reviews }})</span>
              </div>

              <div class="product-price">
                <strong>৳{{ product.price.toLocaleString('en-US') }}</strong>
                <del>৳{{ product.oldPrice.toLocaleString('en-US') }}</del>
              </div>
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
import { ref } from 'vue'
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

const toastMessage = ref('')
let toastTimer = null

const dealCategories = [
  {
    name: 'Saree Collection',
    filter: 'Saree',
    discount: 'UP TO 40% OFF',
    description: 'Elegant sarees for every occasion',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85'
  },
  {
    name: 'Three Piece',
    filter: 'Three Piece',
    discount: 'UP TO 30% OFF',
    description: 'Beautiful styles for everyday elegance',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=700&q=85'
  },
  {
    name: 'Panjabi Collection',
    filter: 'Panjabi',
    discount: 'UP TO 25% OFF',
    description: 'Traditional style with modern comfort',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85'
  },
  {
    name: 'Fabric Collection',
    filter: 'Fabric',
    discount: 'UP TO 50% OFF',
    description: 'Premium fabrics at special prices',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=700&q=85'
  }
]

// Demo products
const dealProducts = [
  {
    id: 101,
    name: 'Premium Silk Saree',
    category: 'Saree',
    price: 2850,
    oldPrice: 3800,
    discount: 25,
    reviews: 48,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 102,
    name: 'Elegant Party Three Piece',
    category: 'Three Piece',
    price: 1950,
    oldPrice: 2600,
    discount: 25,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 103,
    name: 'Classic Traditional Panjabi',
    category: 'Panjabi',
    price: 1450,
    oldPrice: 1900,
    discount: 24,
    reviews: 27,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 104,
    name: 'Premium Cotton Lungi',
    category: 'Lungi',
    price: 650,
    oldPrice: 850,
    discount: 24,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 105,
    name: 'Royal Designer Saree',
    category: 'Saree',
    price: 3200,
    oldPrice: 4200,
    discount: 24,
    reviews: 36,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 106,
    name: 'Premium Casual Three Piece',
    category: 'Three Piece',
    price: 1750,
    oldPrice: 2300,
    discount: 24,
    reviews: 21,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 107,
    name: 'Elegant Cotton Panjabi',
    category: 'Panjabi',
    price: 1250,
    oldPrice: 1650,
    discount: 24,
    reviews: 16,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 108,
    name: 'Premium Printed Fabric',
    category: 'Fabric',
    price: 450,
    oldPrice: 600,
    discount: 25,
    reviews: 14,
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=700&q=85'
  }
]

function showToast(message) {
  toastMessage.value = message

  clearTimeout(toastTimer)

  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2500)
}

function addProduct(product) {
  addToCart(product, 1)
  showToast(`${product.name} added to cart!`)
}

function goToProduct(id) {
  router.push(`/product/${id}`)
}
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

/* CATEGORIES */

.deal-categories {
  max-width: 1250px;
  margin: 25px auto 85px;
  padding: 0 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.deal-category {
  color: #292522;
  text-decoration: none;
  text-align: center;
}

.category-image {
  height: 300px;
  position: relative;
  overflow: hidden;
  background: #f4f0eb;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .6s;
}

.deal-category:hover .category-image img {
  transform: scale(1.07);
}

.category-image > span {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #292522;
  color: #fff;
  padding: 9px 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
}

.deal-category h3 {
  font-family: Georgia, serif;
  font-size: 21px;
  font-weight: 500;
  margin: 19px 0 7px;
}

.deal-category p {
  color: #888;
  font-size: 12px;
  margin-bottom: 12px;
}

.category-link {
  color: #a77d48;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* PRODUCTS */

.deals-products {
  background: #f9f7f4;
  padding: 75px 25px 85px;
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
  height: 310px;
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

.product-rating {
  color: #d3a34c;
  font-size: 11px;
}

.product-rating span {
  color: #999;
  margin-left: 5px;
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
  .deal-categories,
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-image {
    height: 330px;
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

  .deal-categories {
    padding: 0 15px;
    gap: 22px 12px;
    margin-bottom: 55px;
  }

  .category-image {
    height: 210px;
  }

  .deal-category h3 {
    font-size: 17px;
  }

  .deal-category p {
    font-size: 11px;
  }

  .deals-products {
    padding: 55px 12px;
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
</style>
