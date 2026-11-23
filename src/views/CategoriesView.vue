
<template>
  <div class="categories-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <!-- HERO BANNER -->
    <section class="category-hero">
      <div class="hero-content">
        <span>EXPLORE OUR COLLECTION</span>
        <h1>Find Your <em>Style</em></h1>
        <p>Discover beautiful collections for every style and occasion.</p>

        <div class="breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <i class="bi bi-chevron-right"></i>
          <span>Categories</span>
        </div>
      </div>
    </section>

    <!-- CATEGORY INTRO -->
    <section class="category-intro">
      <span class="eyebrow">CURATED FOR YOU</span>
      <h2>Shop By Category</h2>
      <p>
        From timeless traditional wear to everyday essentials,
        discover something special in every collection.
      </p>
    </section>

    <!-- CATEGORY GRID -->
    <section class="category-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">OUR COLLECTIONS</span>
          <h2>Explore All Categories</h2>
        </div>

        <RouterLink to="/shop" class="view-all">
          View All Products
          <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="status-message">
        <i class="bi bi-arrow-repeat"></i>
        Loading categories...
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="status-message error-message">
        {{ error }}
        <button @click="fetchCategories">Try Again</button>
      </div>

      <!-- EMPTY -->
      <div v-else-if="categories.length === 0" class="status-message">
        No categories available right now.
      </div>

      <!-- CATEGORY GRID -->
      <div v-else class="category-grid">
        <RouterLink
          v-for="(category, index) in categories"
          :key="category.id"
          :to="{ path: '/shop', query: { category: category.filter } }"
          class="category-card"
        >
          <div
            class="category-image"
            :class="`category-color-${index % 8}`"
          >
            <div class="category-decoration">
              <span class="decoration-circle"></span>
              <span class="decoration-circle second"></span>
            </div>

            <div class="category-name-content">
              <span class="category-label">EXPLORE COLLECTION</span>
              <h3>{{ category.name }}</h3>
              <span class="category-line"></span>
              <p>DISCOVER YOUR STYLE</p>
            </div>

            <div class="category-overlay">
              <span class="category-explore">
                Explore Now
                <i class="bi bi-arrow-right"></i>
              </span>
            </div>
          </div>

          <div class="category-info">
            <div>
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </div>

            <span class="category-arrow">
              <i class="bi bi-arrow-up-right"></i>
            </span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- BOTTOM PROMO -->
    <section class="category-promo">
      <div>
        <span>YOUR STYLE, YOUR STORY</span>
        <h2>Discover Something Beautiful</h2>
        <p>Find your favourite pieces from our latest collections.</p>

        <RouterLink to="/shop" class="promo-btn">
          Shop Now
          <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>
    </section>

    <FooterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { RouterLink } from 'vue-router'
import { useCart } from '../stores/cart'

const {
  cartCount,
  cartTotal
} = useCart()

const API_BASE_URL = 'https://shop.shahedislam.xyz/api'

const categories = ref([])
const loading = ref(false)
const error = ref('')

// LOAD CATEGORIES FROM BACKEND
async function fetchCategories() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(
      `${API_BASE_URL}/storefront/categories`
    )

    if (!response.ok) {
      throw new Error('Failed to load categories')
    }

    const result = await response.json()

    categories.value = (result.data || []).map(category => {
      const name = category.name || 'General'

      return {
        id: category.id,
        name,
        filter: name,
        description:
          category.description || 'Explore our beautiful collection',
        backendData: category
      }
    })

  } catch (err) {
    console.error('Category Loading Error:', err)
    error.value = 'Unable to load categories. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.categories-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #fff;
}

/* HERO BANNER */
.category-hero {
  min-height: 310px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 55px 20px;
  color: #fff;
  background:
    linear-gradient(rgba(25, 20, 17, .72), rgba(25, 20, 17, .72)),
    url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85')
    center 45% / cover no-repeat;
}

.hero-content > span {
  color: #d7b47b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
}

.category-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 500;
  margin: 15px 0;
}

.category-hero h1 em {
  color: #d7b47b;
}

.category-hero p {
  color: #eee;
  font-size: 15px;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
  font-size: 13px;
  color: #d7b47b;
}

.breadcrumb a {
  color: #fff;
  text-decoration: none;
}

/* INTRO */
.category-intro {
  max-width: 700px;
  margin: auto;
  padding: 65px 20px 40px;
  text-align: center;
}

.eyebrow {
  color: #b28a52;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
}

.category-intro h2,
.section-heading h2 {
  font-family: Georgia, serif;
  font-size: 38px;
  color: #29231f;
  margin: 12px 0;
}

.category-intro p {
  color: #888;
  font-size: 14px;
  line-height: 1.8;
}

/* CATEGORY GRID */
.category-section {
  max-width: 1250px;
  margin: auto;
  padding: 15px 25px 85px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 35px;
}

.section-heading h2 {
  margin-bottom: 0;
}

.view-all {
  color: #a27b45;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.view-all i {
  margin-left: 6px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px 23px;
}

.category-card {
  text-decoration: none;
  color: inherit;
  min-width: 0;
}

.category-image {
  height: 360px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  isolation: isolate;
  transition: transform .4s;
}

/* CATEGORY BACKGROUND COLORS */
.category-color-0 {
  background: linear-gradient(145deg, #f3e4dc, #dfc0b1);
  color: #704638;
}

.category-color-1 {
  background: linear-gradient(145deg, #e9e7f0, #c8c5dd);
  color: #484568;
}

.category-color-2 {
  background: linear-gradient(145deg, #e5eee4, #bfd0bd);
  color: #405b40;
}

.category-color-3 {
  background: linear-gradient(145deg, #f2ead9, #dfcda9);
  color: #79613a;
}

.category-color-4 {
  background: linear-gradient(145deg, #e6eaf0, #c4cedd);
  color: #40536f;
}

.category-color-5 {
  background: linear-gradient(145deg, #f2e4e8, #dfc1cc);
  color: #754b5c;
}

.category-color-6 {
  background: linear-gradient(145deg, #e8e3d9, #d1c4ad);
  color: #66543d;
}

.category-color-7 {
  background: linear-gradient(145deg, #e4e9e7, #c3d0ca);
  color: #405a50;
}

/* DECORATION */
.category-decoration {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  width: 280px;
  height: 280px;
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: .13;
  top: -100px;
  right: -90px;
}

.decoration-circle.second {
  width: 210px;
  height: 210px;
  top: auto;
  right: auto;
  bottom: -100px;
  left: -60px;
}

/* CATEGORY NAME */
.category-name-content {
  padding: 25px;
  position: relative;
  z-index: 1;
  transition: transform .4s;
}

.category-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  opacity: .75;
}

.category-name-content h3 {
  font-family: Georgia, serif;
  font-size: clamp(27px, 3vw, 39px);
  font-weight: 500;
  line-height: 1.2;
  margin: 20px 0;
  overflow-wrap: anywhere;
}

.category-line {
  display: block;
  width: 48px;
  height: 1px;
  background: currentColor;
  margin: 0 auto 17px;
  opacity: .55;
}

.category-name-content p {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  margin: 0;
  opacity: .75;
}

.category-card:hover .category-name-content {
  transform: translateY(-8px);
}

/* HOVER OVERLAY */
.category-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 22px;
  background: linear-gradient(transparent 45%, rgba(0,0,0,.45));
  opacity: 0;
  transition: .3s;
}

.category-card:hover .category-overlay {
  opacity: 1;
}

.category-explore {
  color: #fff;
  font-size: 13px;
  border-bottom: 1px solid #d7b47b;
  padding-bottom: 6px;
}

.category-explore i {
  margin-left: 7px;
}

/* CATEGORY INFO */
.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 3px;
  border-bottom: 1px solid #eee;
}

.category-info h3 {
  font-family: Georgia, serif;
  font-size: 19px;
  color: #29231f;
  margin: 0 0 6px;
}

.category-info p {
  color: #999;
  font-size: 12px;
  margin: 0;
}

.category-arrow {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e1d7;
  color: #a27b45;
  border-radius: 50%;
  transition: .3s;
  flex-shrink: 0;
}

.category-card:hover .category-arrow {
  background: #29231f;
  color: #fff;
  border-color: #29231f;
}

/* LOADING / ERROR */
.status-message {
  padding: 45px 15px;
  color: #777;
  font-size: 14px;
  text-align: center;
}

.status-message i {
  margin-right: 7px;
  font-size: 18px;
}

.error-message {
  color: #b84949;
}

.error-message button {
  display: block;
  margin: 12px auto 0;
  padding: 9px 18px;
  border: 1px solid #bd914c;
  background: #fff;
  color: #a77c35;
  cursor: pointer;
}

/* BOTTOM PROMO */
.category-promo {
  min-height: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  background:
    linear-gradient(rgba(28, 22, 18, .78), rgba(28, 22, 18, .78)),
    url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85')
    center / cover no-repeat;
}

.category-promo > div > span {
  color: #d7b47b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
}

.category-promo h2 {
  color: #fff;
  font-family: Georgia, serif;
  font-size: clamp(30px, 5vw, 45px);
  margin: 16px 0;
}

.category-promo p {
  color: #ddd;
  font-size: 14px;
  margin-bottom: 25px;
}

.promo-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 25px;
  background: #d0ad78;
  color: #211c18;
  text-decoration: none;
  font-size: 13px;
  transition: .3s;
}

.promo-btn:hover {
  background: #fff;
  color: #29231f;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .category-image {
    height: 320px;
  }
}

@media (max-width: 600px) {
  .category-intro {
    padding: 50px 20px 30px;
  }

  .category-intro h2,
  .section-heading h2 {
    font-size: 30px;
  }

  .category-section {
    padding: 10px 16px 60px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .category-grid {
    gap: 25px 13px;
  }

  .category-image {
    height: 235px;
  }

  .category-name-content {
    padding: 12px;
  }

  .category-label {
    font-size: 8px;
    letter-spacing: 2px;
  }

  .category-name-content h3 {
    font-size: clamp(19px, 5vw, 26px);
    margin: 14px 0;
  }

  .category-name-content p {
    font-size: 8px;
    letter-spacing: 1px;
  }

  .category-info h3 {
    font-size: 16px;
  }

  .category-info p {
    font-size: 11px;
  }

  .category-arrow {
    width: 30px;
    height: 30px;
  }

  .category-overlay {
    opacity: 1;
    padding: 12px;
  }

  .category-explore {
    font-size: 11px;
  }
}

@media (max-width: 380px) {
  .category-image {
    height: 195px;
  }

  .category-info h3 {
    font-size: 14px;
  }
}
</style>
