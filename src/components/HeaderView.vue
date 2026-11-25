<template>
  <div class="store-header">

    <!-- TOP BAR -->
    <div class="top-bar">
      <div class="top-left">
        <i class="bi bi-envelope-fill"></i>
        <span>support@bastrokutir.com</span>
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

      <!-- MOBILE MENU BUTTON -->
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

      <!-- HEADER ACTIONS -->
      <div class="header-actions">

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
    </header>

    <!-- MENU + SEARCH ROW -->
    <div
      ref="stickyNavigation"
      class="sticky-navigation"
      :class="{ 'is-fixed': isSticky }"
    >

      <!-- DESKTOP NAVIGATION -->
      <nav class="desktop-navigation">

        <RouterLink to="/categories" class="category-button">
          <i class="bi bi-grid-fill"></i>
          <span>All Categories</span>
          <i class="bi bi-chevron-down category-arrow"></i>
        </RouterLink>

        <div class="nav-links">
          <RouterLink to="/" exact-active-class="active">Home</RouterLink>
          <RouterLink to="/shop">Shop</RouterLink>
          <RouterLink to="/categories">Categories</RouterLink>
          <RouterLink to="/deals">Deals</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>

        <!-- DESKTOP SEARCH -->
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

      </nav>

      <!-- MOBILE MENU + SEARCH -->
      <div class="mobile-navigation-bar">

        <button
          class="mobile-menu-toggle"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation"
        >
          <i :class="mobileMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
          <span>Menu</span>
        </button>

        <div class="mobile-search">
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

      </div>

      <!-- MOBILE NAVIGATION LINKS -->
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

          <RouterLink
            to="/"
            exact-active-class="active"
            @click="closeMobileMenu"
          >
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

    <!-- SPACE PRESERVER WHEN MENU ROW BECOMES FIXED -->
    <div
      v-if="isSticky"
      class="sticky-placeholder"
      :style="{ height: stickyHeight + 'px' }"
    ></div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

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

const stickyNavigation = ref(null)
const isSticky = ref(false)
const stickyHeight = ref(57)

let stickyPosition = 0
let resizeObserver = null

function updateStickyPosition() {
  if (!stickyNavigation.value || isSticky.value) return

  stickyPosition =
    stickyNavigation.value.getBoundingClientRect().top + window.scrollY

  stickyHeight.value = stickyNavigation.value.offsetHeight
}

function handleScroll() {
  if (!stickyNavigation.value) return

  const shouldStick = window.scrollY >= stickyPosition

  if (shouldStick !== isSticky.value) {
    isSticky.value = shouldStick
  }
}

function updateStickyHeight() {
  nextTick(() => {
    if (stickyNavigation.value) {
      stickyHeight.value = stickyNavigation.value.offsetHeight
    }
  })
}

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

watch(mobileMenuOpen, () => {
  updateStickyHeight()
})

onMounted(async () => {
  await nextTick()

  updateStickyPosition()

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateStickyPosition)

  if (stickyNavigation.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateStickyHeight()
    })

    resizeObserver.observe(stickyNavigation.value)
  }

  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateStickyPosition)

  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* HEADER WRAPPER */

.store-header {
  position: relative;
  width: 100%;
  z-index: 10000;
  background: #fff;
}

/* TOP BAR */

.top-bar {
  height: 38px;
  background: #f5f3fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5.3%;
  color: #55516a;
  font-size: 12px;
}

.top-left {
  display: flex;
  align-items: center;
  gap: 9px;
}

.top-left i {
  color: #7135d5;
  font-size: 15px;
}

.top-center strong {
  color: #7135d5;
}

.top-right {
  display: flex;
  align-items: center;
  gap: 13px;
}

.top-right a {
  color: #55516a;
  text-decoration: none;
  transition: color .2s;
}

.top-right a:hover {
  color: #7135d5;
}

/* MAIN HEADER */

.main-header {
  min-height: 82px;
  padding: 0 5.3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  background: #fff;
  border-bottom: 1px solid #f0edf5;
}

/* LOGO */

.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #242039;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffb52e, #f58a13);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 26px;
  box-shadow: 0 4px 10px rgba(245, 138, 19, .18);
}

.logo-text {
  font-size: 26px;
  font-weight: 850;
  letter-spacing: -1px;
  line-height: 1.05;
}

.logo-purple {
  color: #7738dc;
}

.logo-text small {
  display: block;
  margin-top: 5px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.8px;
  color: #9691a6;
  text-transform: uppercase;
}

/* HEADER ACTIONS */

.header-actions {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header-action {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #29253d;
  text-decoration: none;
  transition: .2s;
}

.header-action:hover {
  color: #7135d5;
}

.action-icon {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #f5f1fc;
  display: grid;
  place-items: center;
  color: #7135d5;
  font-size: 21px;
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
}

.action-details small {
  color: #9993a9;
  font-size: 10px;
}

.action-details strong {
  font-size: 13px;
  font-weight: 750;
}

.cart-icon {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 19px;
  height: 19px;
  padding: 0 4px;
  border-radius: 20px;
  background: #f04462;
  color: white;
  font-size: 10px;
  display: grid;
  place-items: center;
  border: 2px solid #fff;
}

/* MENU + SEARCH ROW */

.sticky-navigation {
  position: relative;
  width: 100%;
  z-index: 10001;
  background: #fff;
  box-shadow: 0 4px 15px rgba(35, 24, 65, .08);
  border-bottom: 1px solid #eeeaf5;
}

/* FIXED STATE */

.sticky-navigation.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10001;
  box-shadow: 0 4px 15px rgba(35, 24, 65, .12);
}

/* PLACEHOLDER */

.sticky-placeholder {
  width: 100%;
  pointer-events: none;
}

/* DESKTOP NAVIGATION */

.desktop-navigation {
  min-height: 57px;
  padding: 0 5.3%;
  display: flex;
  align-items: center;
  gap: 23px;
}

/* CATEGORY BUTTON */

.category-button {
  height: 38px;
  min-width: 165px;
  padding: 0 13px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  flex-shrink: 0;
  background: linear-gradient(110deg, #7434d4, #9250e9);
  color: white;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(113, 53, 213, .15);
  transition: .2s;
}

.category-button:hover {
  background: linear-gradient(110deg, #6225c2, #8138dc);
  color: white;
}

/* NAV LINKS */

.nav-links {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(13px, 1.8vw, 25px);
  min-width: 0;
}

.nav-links a {
  height: 57px;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: #464157;
  font-size: 13px;
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

/* DESKTOP SEARCH */

.search-box {
  width: 205px;
  height: 36px;
  flex-shrink: 0;
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
  padding: 0 12px;
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
  height: 36px;
  flex-shrink: 0;
  border: none;
  background: #7135d5;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: .2s;
}

.search-box button:hover {
  background: #5822b5;
}

/* MOBILE ELEMENTS */

.mobile-menu-button,
.mobile-navigation-bar,
.mobile-navigation {
  display: none;
}

/* MEDIUM DESKTOP */

@media (max-width: 1250px) and (min-width: 769px) {
  .main-header,
  .desktop-navigation {
    padding-left: 3%;
    padding-right: 3%;
  }

  .desktop-navigation {
    gap: 14px;
  }

  .category-button {
    min-width: 145px;
  }

  .nav-links {
    gap: 13px;
  }

  .nav-links a {
    font-size: 12px;
  }

  .search-box {
    width: 175px;
  }

  .header-actions {
    gap: 20px;
  }
}

@media (max-width: 1000px) and (min-width: 769px) {
  .main-header,
  .desktop-navigation {
    padding-left: 2%;
    padding-right: 2%;
  }

  .logo-text {
    font-size: 23px;
  }

  .logo-icon {
    width: 41px;
    height: 41px;
  }

  .header-actions {
    gap: 12px;
  }

  .action-details small {
    display: none;
  }

  .desktop-navigation {
    gap: 10px;
  }

  .category-button {
    min-width: 125px;
    font-size: 10px;
    gap: 5px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-links a {
    font-size: 11px;
  }

  .search-box {
    width: 145px;
  }

  .search-box input {
    padding: 0 8px;
    font-size: 10px;
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
    min-height: 65px;
    padding: 0 15px;
    gap: 10px;
  }

  .logo {
    gap: 8px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    font-size: 21px;
    border-radius: 9px;
  }

  .logo-text {
    font-size: 21px;
  }

  .logo-text small {
    font-size: 8px;
    letter-spacing: 1.4px;
  }

  .header-actions {
    gap: 0;
  }

  .support-action {
    display: none;
  }

  .cart-action {
    gap: 0;
  }

  .cart-action .action-details {
    display: none;
  }

  .cart-action .action-icon {
    width: 39px;
    height: 39px;
    font-size: 20px;
  }

  /* MOBILE MENU + SEARCH */

  .desktop-navigation {
    display: none;
  }

  .mobile-navigation-bar {
    min-height: 55px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mobile-menu-toggle {
    height: 36px;
    padding: 0 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    flex-shrink: 0;
    border: none;
    border-radius: 6px;
    background: #f2ecfb;
    color: #7135d5;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }

  .mobile-menu-toggle i {
    font-size: 18px;
  }

  .mobile-search {
    height: 37px;
    flex: 1;
    min-width: 0;
    display: flex;
    overflow: hidden;
    border: 1px solid #e9e4f1;
    border-radius: 22px;
    background: #f8f6fb;
  }

  .mobile-search input {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding: 0 12px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 11px;
  }

  .mobile-search button {
    width: 38px;
    flex-shrink: 0;
    border: none;
    background: #7135d5;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  /* MOBILE MENU LINKS */

  .mobile-navigation {
    display: flex;
    flex-direction: column;
    padding: 10px 16px 15px;
    background: #fff;
    border-top: 1px solid #eeeaf5;
    box-shadow: 0 12px 20px rgba(0, 0, 0, .10);
    max-height: calc(100vh - 90px);
    overflow-y: auto;
  }

  .mobile-navigation > a {
    min-height: 46px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #f0edf5;
    color: #393449;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
  }

  .mobile-navigation > a > i {
    color: #7135d5;
    font-size: 17px;
  }

  .mobile-navigation > a.router-link-active {
    color: #7135d5;
  }

  .mobile-navigation .mobile-category-link {
    min-height: 43px;
    justify-content: flex-start;
    padding: 0 12px;
    margin: 4px 0 9px;
    border: none;
    border-radius: 6px;
    background: #f4effc;
    color: #7135d5;
  }

  .mobile-category-link i:last-child {
    margin-left: auto;
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