
<template>
  <div class="home-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <main>
      <HeroSlider />
      <FeaturesSection />
      <TrendingProducts
        @add-to-cart="handleAddToCart"
      />
    </main>

    <FooterView />
  </div>
</template>

<script setup>
import HeaderView from '../components/HeaderView.vue'
import HeroSlider from '../components/HeroSlider.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import TrendingProducts from '../components/TrendingProducts.vue'
import FooterView from '../components/FooterView.vue'

import { useCart } from '../stores/cart'

const {
  cartCount,
  cartTotal,
  addToCart
} = useCart()

function handleAddToCart({ product, quantity }) {
  addToCart(product, quantity)
}
</script>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

main {
  width: 100%;
}
</style>
