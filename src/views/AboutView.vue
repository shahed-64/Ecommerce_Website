
<template>
  <div class="about-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <main>
      <!-- HERO -->
      <section class="about-hero">
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <span>OUR STORY</span>
          <h1>Tradition Meets<br />Timeless Elegance</h1>
          <p>
            Bringing beautiful fashion, timeless traditions and
            exceptional quality together for every occasion.
          </p>

          <a href="#our-story" class="hero-btn">
            DISCOVER OUR STORY
            <i class="bi bi-arrow-down"></i>
          </a>
        </div>

        <div class="hero-caption">
          <span>BASTRO KUTIR</span>
          <small>STYLE • CULTURE • ELEGANCE</small>
        </div>
      </section>

      <!-- BRAND INTRO -->
      <section class="brand-intro" id="our-story">
        <div class="intro-image">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90"
            alt="Traditional fashion collection"
          />
          <div class="image-label">
            <span>BASTRO KUTIR</span>
            <small>Celebrating timeless style</small>
          </div>
        </div>

        <div class="intro-content">
          <span class="section-label">WELCOME TO BASTRO KUTIR</span>

          <h2>Where Every Thread Tells A Story</h2>

          <p>
            Fashion is more than what we wear. It is a reflection
            of our personality, culture and individuality.
          </p>

          <p>
            At Bastro Kutir, we believe that every outfit should
            make you feel confident, comfortable and beautiful.
            Our collections bring together traditional charm
            and contemporary style for every moment of life.
          </p>

          <p>
            From elegant sarees and beautiful three pieces to
            stylish panjabis and quality fabrics, we aim to make
            your shopping experience special.
          </p>

          <RouterLink to="/shop" class="text-link">
            EXPLORE OUR COLLECTION
            <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>
      </section>

      <!-- BRAND VALUES -->
      <section class="values-section">
        <div class="section-heading">
          <span class="section-label">WHAT WE BELIEVE</span>
          <h2>Our Values</h2>
          <p>
            The principles that guide everything we do.
          </p>
        </div>

        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="bi bi-gem"></i>
            </div>
            <h3>Quality First</h3>
            <p>
              We focus on quality materials, beautiful designs
              and products you can feel good wearing.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <i class="bi bi-heart"></i>
            </div>
            <h3>Customer Happiness</h3>
            <p>
              Your satisfaction matters. We want every shopping
              experience to be simple and enjoyable.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <i class="bi bi-stars"></i>
            </div>
            <h3>Timeless Style</h3>
            <p>
              We celebrate traditional beauty while embracing
              modern fashion and everyday elegance.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <i class="bi bi-shield-check"></i>
            </div>
            <h3>Trust & Care</h3>
            <p>
              We believe in honest service, thoughtful care
              and building lasting customer relationships.
            </p>
          </div>
        </div>
      </section>

      <!-- MISSION & VISION -->
      <section class="mission-section" style="height:900px">
        <div class="mission-image">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1100&q=90"
            alt="Traditional fashion collection"
            @error="$event.target.style.display = 'none'"
          />
        </div>

        <div class="mission-content">
          <div class="mission-item">
            <span class="section-label">OUR PURPOSE</span>
            <h2>Our Mission</h2>
            <p>
              To make beautiful, quality fashion accessible
              while providing a convenient and enjoyable
              shopping experience for every customer.
            </p>
          </div>

          <div class="mission-divider"></div>

          <div class="mission-item">
            <span class="section-label">OUR DREAM</span>
            <h2>Our Vision</h2>
            <p>
              To become a trusted fashion destination where
              tradition, creativity and modern style come
              together in every collection.
            </p>
          </div>
        </div>
      </section>

      <!-- COLLECTION -->
      <section class="collection-section">
        <div class="collection-heading">
          <span class="section-label">EXPLORE OUR WORLD</span>
          <h2>Something Beautiful For Everyone</h2>
          <p>
            Discover styles that celebrate your individuality.
          </p>
        </div>

        <div class="collection-grid">
          <RouterLink
            to="/shop?category=Saree"
            class="collection-card collection-large"
          >
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=90"
              alt="Saree collection"
            />
            <div class="collection-overlay">
              <span>TRADITIONAL ELEGANCE</span>
              <h3>Saree Collection</h3>
              <span class="collection-link">
                EXPLORE NOW <i class="bi bi-arrow-right"></i>
              </span>
            </div>
          </RouterLink>

          <RouterLink
            to="/shop?category=Three%20Piece"
            class="collection-card"
          >
            <img
              src="https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=800&q=90"
              alt="Three piece collection"
            />
            <div class="collection-overlay">
              <span>EVERYDAY BEAUTY</span>
              <h3>Three Piece</h3>
              <span class="collection-link">
                EXPLORE NOW <i class="bi bi-arrow-right"></i>
              </span>
            </div>
          </RouterLink>

          <RouterLink
            to="/shop?category=Panjabi"
            class="collection-card"
          >
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=90"
              alt="Panjabi collection"
            />
            <div class="collection-overlay">
              <span>CLASSIC STYLE</span>
              <h3>Panjabi</h3>
              <span class="collection-link">
                EXPLORE NOW <i class="bi bi-arrow-right"></i>
              </span>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- WHY CHOOSE US -->
      <section class="why-section">
        <div class="why-image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=90"
            alt="Fashion shopping"
          />
        </div>

        <div class="why-content">
          <span class="section-label">THE BASTRO KUTIR EXPERIENCE</span>
          <h2>Fashion That Feels Like You</h2>

          <p>
            We want finding your favourite outfit to be
            an experience worth remembering.
          </p>

          <div class="why-list">
            <div class="why-item">
              <i class="bi bi-check-circle-fill"></i>
              <div>
                <h4>Carefully Selected Collections</h4>
                <p>Styles chosen with attention to beauty and quality.</p>
              </div>
            </div>

            <div class="why-item">
              <i class="bi bi-check-circle-fill"></i>
              <div>
                <h4>Convenient Online Shopping</h4>
                <p>Explore and shop your favourite styles with ease.</p>
              </div>
            </div>

            <div class="why-item">
              <i class="bi bi-check-circle-fill"></i>
              <div>
                <h4>Customer-Focused Service</h4>
                <p>We are here to make your shopping experience better.</p>
              </div>
            </div>
          </div>

          <RouterLink to="/shop" class="shop-btn">
            START SHOPPING
            <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="about-cta">
        <span>YOUR STYLE, YOUR STORY</span>
        <h2>Let's Celebrate Your Style</h2>
        <p>
          Find something beautiful for every moment.
          Your next favourite outfit is waiting.
        </p>

        <RouterLink to="/shop" class="cta-btn">
          SHOP NOW <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </section>
    </main>

    <FooterView />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { useCart } from '../stores/cart'

const {
  cartCount,
  cartTotal
} = useCart()
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.about-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  color: #302923;
  background: #fff;
}

.section-label {
  display: inline-block;
  color: #b18a58;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  margin-bottom: 16px;
}

/* HERO */

.about-hero {
  position: relative;
  min-height: 570px;
  display: flex;
  align-items: center;
  padding: 70px 10%;
  background:
    url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90')
    center 42% / cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(32, 24, 20, .83),
    rgba(32, 24, 20, .48),
    rgba(32, 24, 20, .08)
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 650px;
  color: #fff;
}

.hero-content > span {
  color: #d8b783;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
}

.hero-content h1 {
  font-family: Georgia, serif;
  font-size: clamp(43px, 6vw, 72px);
  line-height: 1.12;
  font-weight: 400;
  margin: 22px 0;
}

.hero-content p {
  max-width: 470px;
  color: #eee7df;
  font-size: 14px;
  line-height: 1.9;
  margin-bottom: 30px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  background: #bd955e;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-decoration: none;
  transition: .3s;
}

.hero-btn:hover {
  background: #fff;
  color: #302923;
}

.hero-caption {
  position: absolute;
  z-index: 1;
  right: 8%;
  bottom: 35px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.hero-caption span {
  font-family: Georgia, serif;
  font-size: 18px;
  letter-spacing: 3px;
}

.hero-caption small {
  font-size: 9px;
  letter-spacing: 2px;
  color: #e0c49e;
}

/* BRAND INTRO */

.brand-intro {
  max-width: 1200px;
  margin: 0 auto;
  padding: 110px 25px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 85px;
}

.intro-image {
  position: relative;
  height: 540px;
}

.intro-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-label {
  position: absolute;
  right: -30px;
  bottom: 35px;
  background: #fff;
  padding: 22px 30px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 35px rgba(0,0,0,.10);
}

.image-label span {
  font-family: Georgia, serif;
  font-size: 18px;
  letter-spacing: 2px;
}

.image-label small {
  color: #a78b69;
  font-size: 11px;
  margin-top: 5px;
}

.intro-content h2 {
  font-family: Georgia, serif;
  font-size: clamp(34px, 4vw, 47px);
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 25px;
}

.intro-content p {
  color: #77716c;
  font-size: 14px;
  line-height: 2;
  margin-bottom: 17px;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 17px;
  color: #a17b4c;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-decoration: none;
  border-bottom: 1px solid #bd955e;
  padding-bottom: 8px;
}

/* VALUES */

.values-section {
  padding: 90px 25px 100px;
  background: #f8f6f2;
}

.section-heading {
  text-align: center;
  margin-bottom: 55px;
}

.section-heading h2,
.collection-heading h2 {
  font-family: Georgia, serif;
  font-size: 42px;
  font-weight: 400;
  margin: 0 0 12px;
}

.section-heading p,
.collection-heading p {
  color: #89827b;
  font-size: 14px;
}

.values-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.value-card {
  padding: 40px 25px;
  text-align: center;
  background: #fff;
  transition: .3s;
}

.value-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 15px 35px rgba(0,0,0,.07);
}

.value-icon {
  width: 65px;
  height: 65px;
  margin: 0 auto 22px;
  border: 1px solid #d8c3a6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ad8756;
  font-size: 25px;
}

.value-card h3 {
  font-family: Georgia, serif;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 13px;
}

.value-card p {
  color: #89827b;
  font-size: 12px;
  line-height: 1.9;
  margin: 0;
}

/* MISSION */

.mission-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 560px;
  background: #302923;
}

.mission-image {
  min-height: 560px;
}

.mission-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mission-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 70px 12%;
  color: #fff;
}

.mission-item h2 {
  font-family: Georgia, serif;
  font-size: 37px;
  font-weight: 400;
  margin: 0 0 15px;
}

.mission-item p {
  color: #c9c0b8;
  font-size: 13px;
  line-height: 2;
  max-width: 450px;
}

.mission-divider {
  height: 1px;
  width: 100%;
  background: rgba(255,255,255,.18);
  margin: 25px 0;
}

/* COLLECTION */

.collection-section {
  max-width: 1250px;
  margin: auto;
  padding: 100px 25px;
}

.collection-heading {
  text-align: center;
  margin-bottom: 45px;
}

.collection-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  grid-template-rows: 260px 260px;
  gap: 20px;
}

.collection-card {
  position: relative;
  display: block;
  overflow: hidden;
  color: #fff;
  text-decoration: none;
}

.collection-large {
  grid-row: span 2;
}

.collection-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .6s;
}

.collection-card:hover img {
  transform: scale(1.06);
}

.collection-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    rgba(24,19,16,.78),
    rgba(24,19,16,.05) 75%
  );
}

.collection-overlay {
  position: absolute;
  z-index: 1;
  left: 30px;
  right: 20px;
  bottom: 28px;
}

.collection-overlay > span:first-child {
  color: #dfc19a;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
}

.collection-overlay h3 {
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: 400;
  margin: 8px 0 12px;
}

.collection-link {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* WHY CHOOSE US */

.why-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px 25px 110px;
}

.why-image {
  height: 520px;
}

.why-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.why-content h2 {
  font-family: Georgia, serif;
  font-size: 44px;
  line-height: 1.2;
  font-weight: 400;
  margin: 0 0 18px;
}

.why-content > p {
  color: #827a72;
  font-size: 14px;
  line-height: 1.9;
  margin-bottom: 30px;
}

.why-item {
  display: flex;
  gap: 15px;
  margin-bottom: 23px;
}

.why-item > i {
  color: #b18a58;
  font-size: 20px;
  margin-top: 3px;
}

.why-item h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px;
}

.why-item p {
  color: #89827b;
  font-size: 12px;
  margin: 0;
  line-height: 1.7;
}

.shop-btn {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  padding: 15px 27px;
  background: #302923;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-decoration: none;
  transition: .3s;
}

.shop-btn:hover {
  background: #bd955e;
}

/* CTA */

.about-cta {
  padding: 85px 20px;
  text-align: center;
  color: #fff;
  background:
    linear-gradient(rgba(36,27,22,.83), rgba(36,27,22,.83)),
    url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85')
    center / cover no-repeat;
}

.about-cta > span {
  color: #d9b987;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
}

.about-cta h2 {
  font-family: Georgia, serif;
  font-size: 43px;
  font-weight: 400;
  margin: 17px 0;
}

.about-cta p {
  color: #e0d8d0;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 27px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 13px;
  padding: 15px 30px;
  background: #bd955e;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-decoration: none;
  transition: .3s;
}

.cta-btn:hover {
  background: #fff;
  color: #302923;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .brand-intro {
    gap: 45px;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .why-section {
    gap: 40px;
  }

  .why-content h2 {
    font-size: 36px;
  }
}

@media (max-width: 650px) {
  .about-hero {
    min-height: 480px;
    padding: 55px 25px;
    background-position: 60% center;
  }

  .hero-content h1 {
    font-size: 44px;
  }

  .hero-content p {
    font-size: 13px;
  }

  .hero-caption {
    right: 20px;
    bottom: 20px;
  }

  .brand-intro {
    grid-template-columns: 1fr;
    padding: 65px 20px;
    gap: 45px;
  }

  .intro-image {
    height: 400px;
    margin-right: 15px;
  }

  .image-label {
    right: -15px;
    bottom: 20px;
  }

  .intro-content h2 {
    font-size: 36px;
  }

  .values-section {
    padding: 65px 15px;
  }

  .section-heading h2,
  .collection-heading h2 {
    font-size: 33px;
  }

  .values-grid {
    gap: 12px;
  }

  .value-card {
    padding: 28px 13px;
  }

  .value-card h3 {
    font-size: 17px;
  }

  .value-card p {
    font-size: 11px;
  }

  .value-icon {
    width: 55px;
    height: 55px;
    font-size: 22px;
  }

  .mission-section {
    grid-template-columns: 1fr;
  }

  .mission-image {
    min-height: 350px;
    height: 350px;
  }

  .mission-content {
    padding: 55px 25px;
  }

  .mission-item h2 {
    font-size: 32px;
  }

  .collection-section {
    padding: 65px 15px;
  }

  .collection-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 250px 200px;
    gap: 10px;
  }

  .collection-large {
    grid-column: span 2;
    grid-row: auto;
  }

  .collection-overlay {
    left: 15px;
    bottom: 16px;
  }

  .collection-overlay h3 {
    font-size: 20px;
  }

  .collection-overlay > span:first-child {
    font-size: 8px;
  }

  .collection-link {
    font-size: 9px;
  }

  .why-section {
    grid-template-columns: 1fr;
    padding: 10px 20px 70px;
    gap: 35px;
  }

  .why-image {
    height: 350px;
  }

  .why-content h2 {
    font-size: 36px;
  }

  .about-cta {
    padding: 65px 20px;
  }

  .about-cta h2 {
    font-size: 34px;
  }
}
</style>
