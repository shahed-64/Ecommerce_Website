
<template>
  <div class="contact-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <main>
      <!-- HERO -->
      <section class="contact-hero">
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <span class="hero-eyebrow">WE WOULD LOVE TO HEAR FROM YOU</span>
          <h1>Let's Start a<br /><em>Conversation.</em></h1>
          <p>
            Questions, feedback or simply want to say hello?
            We're always happy to connect with you.
          </p>

          <a href="#contact-main" class="hero-button">
            GET IN TOUCH
            <i class="bi bi-arrow-down"></i>
          </a>
        </div>

        <div class="hero-side-text">BASTRO KUTIR · CUSTOMER CARE</div>
      </section>

      <!-- CONTACT INTRO -->
      <section class="contact-intro" id="contact-main">
        <div class="intro-left">
          <span class="section-eyebrow">CONTACT BASTRO KUTIR</span>
          <h2>We're Here<br />For <em>You.</em></h2>
        </div>

        <div class="intro-right">
          <p>
            At Bastro Kutir, we believe great shopping begins
            with great service. Whether you need help with an
            order, product information or anything else, our
            team is ready to assist.
          </p>
        </div>
      </section>

      <!-- CONTACT MAIN -->
      <section class="contact-main">
        <!-- LEFT INFORMATION -->
        <div class="contact-information">
          <div class="info-heading">
            <span class="section-eyebrow">LET'S CONNECT</span>
            <h3>Reach Out To Us</h3>
            <p>
              Choose the easiest way to get in touch.
              We look forward to hearing from you.
            </p>
          </div>

          <div class="info-list">
            <a
              href="mailto:support@bastrokutir.com"
              class="info-card"
            >
              <div class="info-icon">
                <i class="bi bi-envelope"></i>
              </div>
              <div>
                <span>EMAIL US</span>
                <h4>support@bastrokutir.com</h4>
                <small>Send us your questions anytime</small>
              </div>
              <i class="bi bi-arrow-up-right info-arrow"></i>
            </a>

            <div class="info-card">
              <div class="info-icon">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div>
                <span>VISIT US</span>
                <h4>Mirpur, Dhaka</h4>
                <small>Bangladesh</small>
              </div>
              <i class="bi bi-arrow-up-right info-arrow"></i>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <i class="bi bi-clock"></i>
              </div>
              <div>
                <span>BUSINESS HOURS</span>
                <h4>Customer Support</h4>
                <small>Contact us for assistance and availability</small>
              </div>
              <i class="bi bi-arrow-up-right info-arrow"></i>
            </div>
          </div>

          <div class="social-area">
            <span>FOLLOW OUR JOURNEY</span>
            <div class="social-links">
              <a href="#" aria-label="Facebook">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="Pinterest">
                <i class="bi bi-pinterest"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i class="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- CONTACT FORM -->
        <div class="contact-form-wrapper">
          <div class="form-heading">
            <span class="section-eyebrow">SEND US A MESSAGE</span>
            <h3>How Can We Help?</h3>
            <p>
              Fill in the details below and we'll be happy
              to hear from you.
            </p>
          </div>

          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">YOUR NAME *</label>
                <input
                  id="firstName"
                  v-model.trim="form.name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">EMAIL ADDRESS *</label>
                <input
                  id="email"
                  v-model.trim="form.email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">PHONE NUMBER</label>
                <input
                  id="phone"
                  v-model.trim="form.phone"
                  type="tel"
                  placeholder="+880 1XXXXXXXXX"
                />
              </div>

              <div class="form-group">
                <label for="subject">SUBJECT *</label>
                <select
                  id="subject"
                  v-model="form.subject"
                  required
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Shipping & Delivery">Shipping & Delivery</option>
                  <option value="Return & Exchange">Return & Exchange</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-group message-group">
              <label for="message">YOUR MESSAGE *</label>
              <textarea
                id="message"
                v-model.trim="form.message"
                rows="5"
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="submit-button"
              :disabled="submitting"
            >
              {{ submitting ? 'PLEASE WAIT...' : 'SEND MESSAGE' }}
              <i class="bi bi-arrow-right"></i>
            </button>

            <p class="form-note">
              <i class="bi bi-shield-check"></i>
              Your information will be used only to respond to your inquiry.
            </p>

            <div v-if="successMessage" class="form-success">
              <i class="bi bi-check-circle-fill"></i>
              {{ successMessage }}
            </div>
          </form>
        </div>
      </section>

      <!-- IMAGE STRIP -->
      <section class="contact-image-strip">
        <div class="strip-image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
            alt="Fashion shopping"
          />
        </div>

        <div class="strip-content">
          <span class="section-eyebrow">YOUR STYLE MATTERS</span>
          <h2>Every Detail.<br /><em>Every Experience.</em></h2>
          <p>
            From discovering your favourite collection to
            receiving your order, we're here to make every
            moment feel special.
          </p>

          <RouterLink to="/shop" class="strip-button">
            EXPLORE COLLECTION
            <i class="bi bi-arrow-right"></i>
          </RouterLink>
        </div>
      </section>

      <!-- LOCATION -->
      <section class="location-section">
        <div class="location-heading">
          <span class="section-eyebrow">FIND US</span>
          <h2>Our Location</h2>
          <p>Mirpur, Dhaka, Bangladesh</p>
        </div>

        <div class="map-wrapper">
          <iframe
            title="Map showing Mirpur, Dhaka"
            src="https://www.google.com/maps?q=Mirpur,Dhaka,Bangladesh&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="contact-cta">
        <span>BASTRO KUTIR</span>
        <h2>We're Just A Message Away.</h2>
        <p>
          Your satisfaction means everything to us.
          Let's make your shopping experience wonderful.
        </p>
        <a href="mailto:support@bastrokutir.com" class="cta-button">
          EMAIL US <i class="bi bi-envelope"></i>
        </a>
      </section>
    </main>

    <FooterView />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { useCart } from '../stores/cart'

const {
  cartCount,
  cartTotal
} = useCart()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const successMessage = ref('')

function submitForm() {
  if (submitting.value) return

  submitting.value = true
  successMessage.value = ''

  // Frontend demo only. No message is sent to a server.
  setTimeout(() => {
    successMessage.value =
      'Thank you! Your message has been prepared successfully. Please contact us by email for a real inquiry.'

    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''

    submitting.value = false
  }, 700)
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.contact-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #fff;
  color: #302923;
}

.section-eyebrow {
  display: inline-block;
  color: #b18a58;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
}

/* HERO */

.contact-hero {
  position: relative;
  min-height: 530px;
  display: flex;
  align-items: center;
  padding: 70px 10%;
  background:
    url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90')
    center 48% / cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(35, 27, 22, .88),
    rgba(35, 27, 22, .57),
    rgba(35, 27, 22, .10)
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 620px;
  color: #fff;
}

.hero-eyebrow {
  color: #d8b987;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
}

.hero-content h1 {
  font-family: Georgia, serif;
  font-size: clamp(45px, 6vw, 76px);
  line-height: 1.1;
  font-weight: 400;
  margin: 23px 0;
}

.hero-content h1 em,
.intro-left h2 em,
.strip-content h2 em {
  color: #d6b17f;
  font-weight: 400;
}

.hero-content p {
  max-width: 460px;
  color: #e6dfd8;
  font-size: 14px;
  line-height: 1.9;
  margin-bottom: 30px;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 17px;
  padding: 15px 26px;
  background: #bd955e;
  color: #fff;
  text-decoration: none;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: .3s;
}

.hero-button:hover {
  background: #fff;
  color: #302923;
}

.hero-side-text {
  position: absolute;
  right: 35px;
  bottom: 40px;
  writing-mode: vertical-rl;
  color: rgba(255,255,255,.8);
  font-size: 9px;
  letter-spacing: 3px;
}

/* INTRO */

.contact-intro {
  max-width: 1180px;
  margin: auto;
  padding: 85px 25px 55px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: end;
}

.intro-left h2 {
  font-family: Georgia, serif;
  font-size: 57px;
  line-height: 1.1;
  font-weight: 400;
  margin: 15px 0 0;
}

.intro-left h2 em {
  color: #b18a58;
}

.intro-right {
  padding-bottom: 7px;
}

.intro-right p {
  color: #827a72;
  font-size: 14px;
  line-height: 2;
  max-width: 520px;
  margin: 0;
}

/* MAIN CONTACT */

.contact-main {
  max-width: 1180px;
  margin: 20px auto 100px;
  padding: 0 25px;
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: 55px;
  align-items: start;
}

.contact-information {
  padding: 35px 0;
}

.info-heading h3,
.form-heading h3 {
  font-family: Georgia, serif;
  font-size: 34px;
  font-weight: 400;
  margin: 13px 0;
}

.info-heading > p,
.form-heading > p {
  color: #888078;
  font-size: 13px;
  line-height: 1.8;
}

.info-list {
  margin-top: 40px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 21px 0;
  border-bottom: 1px solid #eee9e2;
  text-decoration: none;
  color: inherit;
}

.info-icon {
  flex-shrink: 0;
  width: 49px;
  height: 49px;
  border: 1px solid #e4d8c7;
  color: #ad8756;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  transition: .3s;
}

.info-card:hover .info-icon {
  background: #bd955e;
  color: #fff;
}

.info-card > div:nth-child(2) {
  flex: 1;
  min-width: 0;
}

.info-card span {
  color: #b18a58;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.info-card h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 5px 0;
  overflow-wrap: anywhere;
}

.info-card small {
  display: block;
  color: #969089;
  font-size: 11px;
  line-height: 1.6;
}

.info-arrow {
  color: #b18a58;
  font-size: 15px;
}

.social-area {
  margin-top: 35px;
}

.social-area > span {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.social-links {
  display: flex;
  gap: 10px;
  margin-top: 17px;
}

.social-links a {
  width: 37px;
  height: 37px;
  border: 1px solid #e5ddd3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #75695e;
  text-decoration: none;
  transition: .3s;
}

.social-links a:hover {
  background: #302923;
  border-color: #302923;
  color: #fff;
}

/* FORM */

.contact-form-wrapper {
  background: #faf8f5;
  padding: 42px;
  border: 1px solid #f0ebe4;
}

.form-heading {
  margin-bottom: 30px;
}

.form-heading h3 {
  font-size: 35px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 23px;
  min-width: 0;
}

.form-group label {
  color: #665b50;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.2px;
  margin-bottom: 10px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  min-width: 0;
  border: 1px solid #e6dfd6;
  border-radius: 0;
  outline: none;
  background: #fff;
  color: #302923;
  font-family: inherit;
  font-size: 12px;
  padding: 15px 14px;
  transition: border-color .3s, box-shadow .3s;
}

.form-group input,
.form-group select {
  height: 49px;
}

.form-group textarea {
  min-height: 130px;
  resize: vertical;
  line-height: 1.7;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #bd955e;
  box-shadow: 0 0 0 3px rgba(189,149,94,.10);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #aaa39b;
}

.submit-button {
  width: 100%;
  min-height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border: none;
  background: #302923;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: .3s;
}

.submit-button:hover:not(:disabled) {
  background: #bd955e;
}

.submit-button:disabled {
  opacity: .7;
  cursor: wait;
}

.form-note {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #928a82;
  font-size: 10px;
  line-height: 1.6;
  margin: 17px 0 0;
}

.form-note i {
  color: #a98a60;
  font-size: 14px;
}

.form-success {
  margin-top: 18px;
  padding: 14px;
  background: #eaf4ec;
  color: #276b3b;
  font-size: 12px;
  line-height: 1.7;
}

.form-success i {
  margin-right: 7px;
}

/* IMAGE STRIP */

.contact-image-strip {
  max-width: 1180px;
  margin: 0 auto 100px;
  padding: 0 25px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 440px;
  background: #302923;
}

.strip-image {
  min-height: 440px;
}

.strip-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.strip-content {
  padding: 55px 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #fff;
}

.strip-content h2 {
  font-family: Georgia, serif;
  font-size: 42px;
  line-height: 1.2;
  font-weight: 400;
  margin: 20px 0;
}

.strip-content h2 em {
  color: #d6b17f;
}

.strip-content p {
  color: #d0c6bc;
  font-size: 13px;
  line-height: 1.9;
  margin-bottom: 25px;
}

.strip-button {
  display: inline-flex;
  align-items: center;
  gap: 13px;
  padding: 14px 20px;
  background: #bd955e;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-decoration: none;
  transition: .3s;
}

.strip-button:hover {
  background: #fff;
  color: #302923;
}

/* MAP */

.location-section {
  max-width: 1180px;
  margin: 0 auto 100px;
  padding: 0 25px;
}

.location-heading {
  text-align: center;
  margin-bottom: 30px;
}

.location-heading h2 {
  font-family: Georgia, serif;
  font-size: 39px;
  font-weight: 400;
  margin: 12px 0 8px;
}

.location-heading p {
  color: #89827b;
  font-size: 13px;
}

.map-wrapper {
  height: 380px;
  overflow: hidden;
  background: #f2eee8;
  border: 1px solid #eee8df;
}

.map-wrapper iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

/* CTA */

.contact-cta {
  padding: 85px 20px;
  text-align: center;
  color: #fff;
  background:
    linear-gradient(rgba(38,29,24,.86), rgba(38,29,24,.86)),
    url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85')
    center / cover no-repeat;
}

.contact-cta > span {
  color: #d6b17f;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
}

.contact-cta h2 {
  font-family: Georgia, serif;
  font-size: 43px;
  font-weight: 400;
  margin: 17px 0;
}

.contact-cta p {
  color: #ded5cc;
  font-size: 13px;
  line-height: 1.9;
  margin-bottom: 28px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 27px;
  background: #bd955e;
  color: #fff;
  text-decoration: none;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: .3s;
}

.cta-button:hover {
  background: #fff;
  color: #302923;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .contact-main {
    gap: 30px;
  }

  .contact-form-wrapper {
    padding: 28px;
  }

  .contact-image-strip {
    grid-template-columns: 1fr 1fr;
  }

  .strip-content {
    padding: 35px 8%;
  }

  .strip-content h2 {
    font-size: 34px;
  }
}

@media (max-width: 650px) {
  .contact-hero {
    min-height: 460px;
    padding: 55px 25px;
    background-position: 60% center;
  }

  .hero-content h1 {
    font-size: 47px;
  }

  .hero-content p {
    font-size: 12px;
  }

  .hero-side-text {
    right: 12px;
    bottom: 20px;
    font-size: 8px;
  }

  .contact-intro {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 60px 20px 30px;
  }

  .intro-left h2 {
    font-size: 46px;
  }

  .intro-right p {
    font-size: 13px;
  }

  .contact-main {
    grid-template-columns: 1fr;
    gap: 25px;
    margin: 10px auto 65px;
    padding: 0 15px;
  }

  .contact-information {
    padding: 20px 5px;
  }

  .info-heading h3,
  .form-heading h3 {
    font-size: 30px;
  }

  .contact-form-wrapper {
    padding: 25px 17px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .contact-image-strip {
    grid-template-columns: 1fr;
    margin: 0 15px 65px;
    padding: 0;
  }

  .strip-image {
    min-height: 300px;
    height: 300px;
  }

  .strip-content {
    padding: 40px 25px;
  }

  .strip-content h2 {
    font-size: 36px;
  }

  .location-section {
    padding: 0 15px;
    margin-bottom: 65px;
  }

  .location-heading h2 {
    font-size: 33px;
  }

  .map-wrapper {
    height: 300px;
  }

  .contact-cta {
    padding: 65px 20px;
  }

  .contact-cta h2 {
    font-size: 34px;
  }
}
</style>
