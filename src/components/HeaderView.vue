<template>
  <div class="store-header-wrapper">
    <div class="store-header">
      <header class="main-header">

        <!-- LOGO -->
        <RouterLink to="/" class="logo">
          <span class="logo-icon">
            <i class="bi bi-bag-heart-fill"></i>
          </span>

          <span class="logo-text">
            Bastro<span class="logo-purple">Kutir</span>
            <small>Fashion & Lifestyle</small>
          </span>
        </RouterLink>

        <!-- NAVIGATION -->
        <nav class="nav-links">
          <RouterLink to="/" exact-active-class="active">Home</RouterLink>
          <RouterLink to="/shop">Shop</RouterLink>
          <RouterLink to="/categories">Categories</RouterLink>
          <RouterLink to="/deals">Deals</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </nav>

        <!-- SEARCH -->
        <div class="search-box">
          <input
            type="text"
            placeholder="Search products..."
            v-model="searchQuery"
            @keyup.enter="searchProducts"
          />

          <button @click="searchProducts" aria-label="Search">
            <i class="bi bi-search"></i>
          </button>
        </div>

        <!-- RIGHT ACTIONS -->
        <div class="header-actions">

          <!-- SUPPORT -->
          <a
            href="mailto:support@bastrokutir.com"
            class="header-action support-action"
          >
            <span class="action-icon">
              <i class="bi bi-headset"></i>
            </span>

            <span class="action-details">
              <small>Need Help?</small>
              <strong>Support</strong>
            </span>
          </a>

          <!-- CART -->
          <RouterLink to="/cart" class="header-action cart-action">
            <span class="action-icon cart-icon">
              <i class="bi bi-cart3"></i>
              <span class="cart-count">{{ cartCount }}</span>
            </span>

            <span class="action-details">
              <small>My Shopping</small>
              <strong>৳{{ cartTotal.toLocaleString('en-BD') }}</strong>
            </span>
          </RouterLink>

        </div>

        <!-- MOBILE MENU BUTTON -->
        <button
          class="mobile-menu-button"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation"
        >
          <i :class="mobileMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
        </button>

      </header>

      <!-- MOBILE NAVIGATION -->
      <Transition name="mobile-menu">
        <nav v-if="mobileMenuOpen" class="mobile-navigation">

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

    <!-- FIXED HEADER-ER JONNO SPACE (CONTENT JENO NICHE NA DUKE) -->
    <div class="store-header-spacer" aria-hidden="true"></div>
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
.store-header-wrapper,
.store-header-wrapper *,
.store-header-wrapper *::before,
.store-header-wrapper *::after {
  box-sizing: border-box;
}

/* FIXED HEADER */

.store-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100000;
  background: #fff;
  box-shadow: 0 4px 15px rgba(35, 24, 65, .08);
}

.store-header-spacer {
  height: 78px;
  width: 100%;
}

.main-header {
  width: 100%;
  min-height: 78px;
  padding: 0 3%;
  display: flex;
  align-items: center;
  gap: 22px;
  background: #fff;
  border-bottom: 1px solid #eeeaf5;
}

/* LOGO */

.logo {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #242039;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: linear-gradient(135deg, #ffb52e, #f58a13);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 24px;
}

.logo-text {
  font-size: 23px;
  font-weight: 850;
  letter-spacing: -1px;
  line-height: 1.05;
  white-space: nowrap;
}

.logo-purple {
  color: #7738dc;
}

.logo-text small {
  display: block;
  margin-top: 4px;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #9691a6;
  text-transform: uppercase;
}

/* NAVIGATION */

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 1.4vw, 21px);
  flex-shrink: 0;
}

.nav-links a {
  height: 78px;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: #464157;
  font-size: 12px;
  font-weight: 650;
  text-decoration: none;
  transition: color .2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #7135d5;
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  border-radius: 4px 4px 0 0;
  background: #7135d5;
}

/* SEARCH */

.search-box {
  height: 37px;
  flex: 1;
  min-width: 110px;
  max-width: 230px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid #e9e4f1;
  border-radius: 25px;
  background: #f8f6fb;
  transition: .2s;
}

.search-box:focus-within {
  border-color: #9562e5;
  box-shadow: 0 0 0 3px rgba(113, 53, 213, .08);
  background: #fff;
}

.search-box input {
  width: 100%;
  min-width: 0;
  flex: 1;
  height: 100%;
  padding: 0 11px;
  border: none;
  outline: none;
  background: transparent;
  color: #29253d;
  font-size: 11px;
}

.search-box input::placeholder {
  color: #a29caf;
}

.search-box button {
  width: 37px;
  height: 37px;
  flex-shrink: 0;
  border: none;
  background: #7135d5;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.search-box button:hover {
  background: #5822b5;
}

/* SUPPORT AND CART */

.header-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 22px;
  flex-shrink: 0;
}

.header-action {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #29253d;
  text-decoration: none;
  flex-shrink: 0;
  transition: .2s;
}

.header-action:hover {
  color: #7135d5;
}

.action-icon {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background: #f5f1fc;
  display: grid;
  place-items: center;
  color: #7135d5;
  font-size: 19px;
  transition: .2s;
}

.header-action:hover .action-icon {
  background: #7135d5;
  color: #fff;
}

.action-details {
  display: flex;
  flex-direction: column;
  gap: 3px;
  white-space: nowrap;
}

.action-details small {
  color: #9993a9;
  font-size: 9px;
}

.action-details strong {
  font-size: 12px;
  font-weight: 750;
}

.cart-icon {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 20px;
  background: #f04462;
  color: white;
  font-size: 10px;
  display: grid;
  place-items: center;
  border: 2px solid #fff;
}

/* MOBILE MENU BUTTON */

.mobile-menu-button {
  display: none;
  width: 37px;
  height: 37px;
  flex-shrink: 0;
  border: none;
  border-radius: 7px;
  background: #f2ecfb;
  color: #7135d5;
  font-size: 21px;
  cursor: pointer;
}

/* MOBILE NAVIGATION */

.mobile-navigation {
  display: none;
}

/* DESKTOP RESPONSIVE */

@media (max-width: 1250px) and (min-width: 769px) {
  .main-header {
    padding: 0 2%;
    gap: 13px;
  }

  .logo-text {
    font-size: 20px;
  }

  .logo-icon {
    width: 38px;
    height: 38px;
    font-size: 21px;
  }

  .nav-links {
    gap: 11px;
  }

  .nav-links a {
    font-size: 11px;
  }

  .header-actions {
    gap: 12px;
  }

  .search-box {
    max-width: 180px;
  }

  .action-details small {
    display: none;
  }

  .action-icon {
    width: 35px;
    height: 35px;
  }
}

/* SMALL DESKTOP */

@media (max-width: 1000px) and (min-width: 769px) {
  .main-header {
    gap: 9px;
    padding: 0 1.5%;
  }

  .logo-text {
    font-size: 18px;
  }

  .logo-icon {
    width: 34px;
    height: 34px;
    font-size: 19px;
  }

  .nav-links {
    gap: 8px;
  }

  .nav-links a {
    font-size: 10px;
  }

  .search-box {
    max-width: 140px;
  }

  .search-box input {
    font-size: 10px;
    padding: 0 7px;
  }

  .support-action .action-details,
  .cart-action .action-details {
    display: none;
  }
}

/* MOBILE */

@media (max-width: 768px) {
  .store-header-spacer {
    height: 65px;
  }

  .main-header {
    min-height: 65px;
    padding: 0 12px;
    gap: 9px;
  }

  .logo {
    gap: 6px;
  }

  .logo-icon {
    width: 34px;
    height: 34px;
    font-size: 19px;
    border-radius: 8px;
  }

  .logo-text {
    font-size: 18px;
  }

  .logo-text small {
    font-size: 7px;
    letter-spacing: 1px;
  }

  .nav-links {
    display: none;
  }

  .search-box {
    flex: 1;
    min-width: 0;
    height: 35px;
  }

  .search-box input {
    padding: 0 9px;
    font-size: 10px;
  }

  .search-box button {
    width: 34px;
    height: 35px;
  }

  .support-action {
    display: none;
  }

  .cart-action .action-details {
    display: none;
  }

  .cart-action .action-icon {
    width: 34px;
    height: 34px;
    font-size: 18px;
  }

  .mobile-menu-button {
    display: grid;
    place-items: center;
  }

  .mobile-navigation {
    display: flex;
    flex-direction: column;
    padding: 8px 16px 14px;
    background: #fff;
    border-top: 1px solid #eeeaf5;
    box-shadow: 0 12px 20px rgba(0, 0, 0, .10);
    max-height: calc(100vh - 65px);
    overflow-y: auto;
  }

  .mobile-navigation a {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #f0edf5;
    color: #393449;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
  }

  .mobile-navigation a i {
    color: #7135d5;
    font-size: 17px;
  }

  .mobile-navigation a.router-link-active {
    color: #7135d5;
  }
}

/* VERY SMALL MOBILE */

@media (max-width: 380px) {
  .main-header {
    gap: 6px;
    padding: 0 8px;
  }

  .logo-text {
    font-size: 16px;
  }

  .logo-icon {
    width: 30px;
    height: 30px;
    font-size: 17px;
  }

  .search-box input {
    font-size: 9px;
    padding: 0 6px;
  }

  .mobile-menu-button,
  .cart-action .action-icon {
    width: 31px;
    height: 31px;
  }
}

/* MOBILE MENU ANIMATION */

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>