
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

      <div class="category-grid">
        <RouterLink
          v-for="category in categories"
          :key="category.id"
          :to="{ path: '/shop', query: { category: category.filter } }"
          class="category-card"
        >
          <div class="category-image">
            <img :src="category.image" :alt="category.name" />

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
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { RouterLink } from 'vue-router'
import { useCart } from '../stores/cart'

const {
  cartCount,
  cartTotal
} = useCart()

const categories = [
  {
    id: 1,
    name: 'Saree Collection',
    filter: 'Saree',
    description: 'Timeless traditional elegance',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 2,
    name: 'Three Piece',
    filter: 'Three Piece',
    description: 'Beautiful styles for every occasion',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93a0?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 3,
    name: 'Panjabi',
    filter: 'Panjabi',
    description: 'Classic style with modern comfort',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 4,
    name: 'Lungi',
    filter: 'Lungi',
    description: 'Comfort in every thread',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 5,
    name: 'Fabric Collection',
    filter: 'Fabric',
    description: 'Create your own beautiful style',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 6,
    name: 'Fashion Collection',
    filter: 'All',
    description: 'Everyday fashion essentials',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85'
  }
]
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
  background: #f5f1eb;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .6s;
}

.category-card:hover .category-image img {
  transform: scale(1.08);
}

.category-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 22px;
  background: linear-gradient(transparent 45%, rgba(0,0,0,.55));
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
