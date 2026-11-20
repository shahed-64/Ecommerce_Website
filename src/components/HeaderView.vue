
<template>
  <div class="store-header">

    <!-- TOP BAR -->
    <div class="top-bar">
      <div class="top-left">
        <i class="bi bi-envelope-fill"></i>
        support@bastrokutir.com
      </div>

      <div class="top-center">
        Free Shipping on Orders <strong>Above ৳1,000</strong>
      </div>

      <div class="top-right">
        <a href="#">Track Order</a>
        <span>|</span>
        <a href="#">Wishlist <i class="bi bi-heart"></i></a>
        <span>|</span>
        <a href="#">Login / Register</a>
      </div>
    </div>

    <!-- MAIN HEADER -->
    <header class="main-header">

      <div class="mobile-menu-button">
        <button
          class="menu-toggle"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation"
        >
          <i :class="mobileMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
        </button>
      </div>

      <RouterLink to="/" class="logo">
        <span class="logo-icon">
          <i class="bi bi-bag-heart-fill"></i>
        </span>

        <span>
          Bastro<span class="logo-purple">Kutir</span>
        </span>
      </RouterLink>

      <div class="search-box">
        <input
          type="text"
          placeholder="Search for products..."
          v-model="searchQuery"
          @keyup.enter="searchProducts"
        />

        <button @click="searchProducts">
          <i class="bi bi-search"></i>
        </button>
      </div>

      <div class="header-actions">

        <a href="#" class="header-action support-action">
          <i class="bi bi-headset"></i>
          <span>Support</span>
        </a>

        <RouterLink to="/cart" class="header-action cart-action">
          <span class="cart-icon">
            <i class="bi bi-cart3"></i>
            <span class="cart-count">{{ cartCount }}</span>
          </span>

          <span class="cart-details">
            Cart
            <small>৳{{ cartTotal.toLocaleString('en-BD') }}</small>
          </span>
        </RouterLink>

      </div>
    </header>

    <!-- DESKTOP NAVIGATION -->
    <nav class="navigation desktop-navigation">

      <RouterLink to="/categories" class="category-button">
        <i class="bi bi-grid-fill"></i>
        All Categories
        <i class="bi bi-chevron-down"></i>
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/" exact-active-class="active">Home</RouterLink>
        <RouterLink to="/shop">Shop</RouterLink>
        <RouterLink to="/categories">Categories</RouterLink>
        <RouterLink to="/deals">Deals</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>
    </nav>

    <!-- MOBILE NAVIGATION -->
    <Transition name="mobile-menu">
      <nav v-if="mobileMenuOpen" class="mobile-navigation">

        <RouterLink
          to="/categories"
          class="mobile-category-link"
          @click="closeMobileMenu"
        >
          <i class="bi bi-grid-fill"></i>
          All Categories
          <i class="bi bi-arrow-right"></i>
        </RouterLink>

        <RouterLink to="/" exact-active-class="active" @click="closeMobileMenu">
          <i class="bi bi-house"></i> Home
        </RouterLink>

        <RouterLink to="/shop" @click="closeMobileMenu">
          <i class="bi bi-bag"></i> Shop
        </RouterLink>

        <RouterLink to="/categories" @click="closeMobileMenu">
          <i class="bi bi-grid"></i> Categories
        </RouterLink>

        <RouterLink to="/deals" @click="closeMobileMenu">
          <i class="bi bi-tags"></i> Deals
        </RouterLink>

        <RouterLink to="/about" @click="closeMobileMenu">
          <i class="bi bi-info-circle"></i> About
        </RouterLink>

        <RouterLink to="/contact" @click="closeMobileMenu">
          <i class="bi bi-envelope"></i> Contact
        </RouterLink>

        <a href="mailto:support@bastrokutir.com">
          <i class="bi bi-headset"></i> Customer Support
        </a>

      </nav>
    </Transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  cartCount: {
    type: Number,
    default: 0
  },
  cartTotal: {
    type: Number,
    default: 0
  }
})

const searchQuery = ref('')
const mobileMenuOpen = ref(false)

function searchProducts() {
  if (!searchQuery.value.trim()) return

  window.dispatchEvent(
    new CustomEvent('product-search', {
      detail: searchQuery.value.trim()
    })
  )

  closeMobileMenu()
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.store-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 12px rgba(25, 24, 46, .06);
}

/* TOP BAR */

.top-bar {
  height: 38px;
  background: #f4f3fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5.3%;
  font-size: 13px;
}

.top-left {
  display: flex;
  align-items: center;
  gap: 9px;
}

.top-left i {
  font-size: 17px;
}

.top-center strong {
  color: #6424d5;
}

.top-right {
  display: flex;
  align-items: center;
  gap: 13px;
}

.top-right span {
  color: #c8c6d3;
}

.top-right a {
  color: #19182e;
  text-decoration: none;
}

/* MAIN HEADER */

.main-header {
  height: 77px;
  display: grid;
  grid-template-columns: 320px minmax(300px, 1fr) 300px;
  align-items: center;
  gap: 20px;
  padding: 0 5.3%;
  border-bottom: 1px solid #eeeeF5;
  background: #fff;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -1px;
  white-space: nowrap;
  color: #19182e;
  text-decoration: none;
}

.logo-icon {
  width: 39px;
  height: 43px;
  border-radius: 7px;
  background: #ffad20;
  color: white;
  display: grid;
  place-items: center;
  font-size: 28px;
}

.logo-purple {
  color: #6d30d9;
}

.search-box {
  height: 46px;
  display: flex;
  background: #f5f4fa;
  border: 1px solid #e6e3ef;
  border-radius: 30px;
  overflow: hidden;
}

.search-box input {
  flex: 1;
  min-width: 0;
  padding: 0 25px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
}

.search-box button {
  width: 54px;
  border: none;
  background: #eeeaf7;
  font-size: 20px;
  cursor: pointer;
}

.header-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
}

.header-action {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  color: #19182e;
  text-decoration: none;
}

.header-action > i,
.cart-icon > i {
  font-size: 24px;
}

.cart-icon {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 17px;
  height: 17px;
  display: grid;
  place-items: center;
  background: #ff3154;
  color: white;
  border-radius: 50%;
  font-size: 10px;
}

.cart-action {
  align-items: flex-start;
}

.cart-action small {
  display: block;
  font-size: 11px;
  margin-top: 2px;
}

.mobile-menu-button {
  display: none;
}

.menu-toggle {
  width: 38px;
  height: 38px;
  border: none;
  background: #f5f2fa;
  color: #19182e;
  border-radius: 6px;
  font-size: 23px;
  display: grid;
  place-items: center;
  cursor: pointer;
}

/* DESKTOP NAVIGATION */
.navigation {
  position: sticky;
  top: 0;
  z-index: 1000;

  height: 47px;
  display: flex;
  align-items: stretch;
  padding: 0 5.3%;
  border-bottom: 1px solid #e9e8ef;
  gap: 25px;
  background: #fff;
}

.category-button {
  width: 223px;
  flex-shrink: 0;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(110deg, #8739e9, #9349ed);
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: stretch;
  gap: 50px;
}

.nav-links a {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  color: #19182e;
}

.nav-links a.router-link-active {
  color: #702de0;
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #702de0;
}

/* MOBILE NAVIGATION */

.mobile-navigation {
  display: none;
}

@media (max-width: 1100px) {
  .main-header {
    grid-template-columns: 200px 1fr 190px;
    padding: 0 3%;
  }

  .navigation {
    padding: 0 3%;
  }

  .nav-links {
    gap: 24px;
  }
}

/* MOBILE */

@media (max-width: 768px) {
  .top-bar {
    height: 30px;
    padding: 0 15px;
    font-size: 10px;
  }

  .top-center,
  .top-right {
    display: none;
  }

  .main-header {
    height: 66px;
    display: grid;
    grid-template-columns: 38px 1fr auto;
    padding: 0 15px;
    gap: 10px;
  }

  .mobile-menu-button {
    display: block;
  }

  .logo {
    font-size: 21px;
    gap: 7px;
  }

  .logo-icon {
    width: 32px;
    height: 35px;
    font-size: 21px;
  }

  .search-box {
    display: none;
  }

  .header-actions {
    gap: 10px;
  }

  .support-action {
    display: none;
  }

  .cart-action {
    align-items: center;
  }

  .cart-action .cart-details {
    display: none;
  }

  .cart-icon > i {
    font-size: 25px;
  }

  .desktop-navigation {
    display: none;
  }

  .mobile-navigation {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-top: 1px solid #eee9f4;
    box-shadow: 0 12px 20px rgba(0,0,0,.10);
    padding: 8px 18px 16px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }

  .mobile-navigation > a {
    min-height: 47px;
    display: flex;
    align-items: center;
    gap: 13px;
    border-bottom: 1px solid #f0edf4;
    color: #29243a;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
  }

  .mobile-navigation > a > i {
    color: #7838d4;
    font-size: 17px;
  }

  .mobile-navigation > a.router-link-active {
    color: #702de0;
  }

  .mobile-navigation .mobile-category-link {
    justify-content: flex-start;
    background: #f5f0fc;
    color: #702de0;
    padding: 0 13px;
    margin: 5px 0 10px;
    border: none;
    border-radius: 6px;
  }

  .mobile-category-link i:last-child {
    margin-left: auto;
  }
}

/* MENU ANIMATION */

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
:global(body) {
  padding-top: 162px;
}

@media (max-width: 768px) {
  :global(body) {
    padding-top: 96px;
  }
}
</style>
