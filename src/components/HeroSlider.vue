
<template>
  <section class="hero-section">
    <div class="hero-slider">

      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="hero-slide"
        :class="{ active: currentSlide === index }"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <span class="hero-subtitle">{{ slide.subtitle }}</span>

          <h1>{{ slide.title }}</h1>

          <p>{{ slide.description }}</p>

          <RouterLink to="/shop" class="hero-button">
            {{ slide.button }}
            <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>
      </div>

      <button class="slider-arrow prev" @click="previousSlide" aria-label="Previous slide">
        <i class="bi bi-chevron-left"></i>
      </button>

      <button class="slider-arrow next" @click="nextSlide" aria-label="Next slide">
        <i class="bi bi-chevron-right"></i>
      </button>

      <div class="slider-dots">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let sliderInterval = null

const slides = [
  {
    subtitle: 'ELEGANCE IN EVERY THREAD',
    title: 'Discover Your Perfect Style',
    description: 'Explore beautiful sarees and exclusive fashion collections for every special moment.',
    button: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90'
  },
  {
    subtitle: 'NEW COLLECTION 2026',
    title: 'Tradition Meets Modern Fashion',
    description: 'Find your favourite outfits with timeless beauty and contemporary elegance.',
    button: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?auto=format&fit=crop&w=2000&q=90'
  },
  {
    subtitle: 'SPECIAL COLLECTION',
    title: 'Make Every Occasion Special',
    description: 'Discover exclusive styles selected to make your moments more beautiful.',
    button: 'Discover More',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90'
  }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function previousSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + slides.length) % slides.length
}

function goToSlide(index) {
  currentSlide.value = index
  restartSlider()
}

function startSlider() {
  sliderInterval = setInterval(nextSlide, 5000)
}

function stopSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval)
    sliderInterval = null
  }
}

function restartSlider() {
  stopSlider()
  startSlider()
}

onMounted(startSlider)
onUnmounted(stopSlider)
</script>

<style scoped>
.hero-section {
  width: 100%;
  padding: 0;
  margin: 0;
}

.hero-slider {
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
  border-radius: 0;
  background: #eee;
}

.hero-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

.hero-slide.active {
  opacity: 1;
  visibility: visible;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.72) 0%,
    rgba(0, 0, 0, 0.42) 48%,
    rgba(0, 0, 0, 0.05) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 700px;
  padding: 50px 8%;
  color: #fff;
}

.hero-subtitle {
  display: inline-block;
  margin-bottom: 18px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #f5d58a;
}

.hero-content h1 {
  margin-bottom: 20px;
  font-size: clamp(36px, 5vw, 62px);
  line-height: 1.15;
  font-weight: 700;
}

.hero-content p {
  max-width: 500px;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  border-radius: 5px;
  background: #c69b50;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: 0.3s;
}

.hero-button:hover {
  background: #a77c35;
  color: #fff;
  transform: translateY(-2px);
}

.slider-arrow {
  position: absolute;
  top: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  transform: translateY(-50%);
  transition: 0.3s;
  cursor: pointer;
}

.slider-arrow:hover {
  background: #c69b50;
  border-color: #c69b50;
}

.slider-arrow.prev {
  left: 25px;
}

.slider-arrow.next {
  right: 25px;
}

.slider-dots {
  position: absolute;
  bottom: 25px;
  left: 50%;
  z-index: 3;
  display: flex;
  gap: 10px;
  transform: translateX(-50%);
}

.slider-dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  transition: 0.3s;
  cursor: pointer;
}

.slider-dots button.active {
  width: 28px;
  background: #c69b50;
}

@media (max-width: 768px) {
  .hero-slider {
    height: 420px;
  }

  .hero-content {
    padding: 35px 9%;
  }

  .hero-content h1 {
    font-size: 36px;
  }

  .hero-content p {
    font-size: 14px;
  }

  .slider-arrow {
    width: 36px;
    height: 36px;
  }

  .slider-arrow.prev {
    left: 12px;
  }

  .slider-arrow.next {
    right: 12px;
  }
}

@media (max-width: 480px) {
  .hero-slider {
    height: 380px;
  }

  .hero-content h1 {
    font-size: 30px;
  }

  .hero-subtitle {
    font-size: 10px;
    letter-spacing: 2px;
  }
}
</style>
