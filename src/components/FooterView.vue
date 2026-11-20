
<template>
  <footer class="footer">
    <!-- NEWSLETTER -->
    <div class="newsletter">
      <div class="newsletter-content">
        <div>
          <span class="newsletter-label">STAY CONNECTED</span>
          <h2>Get 10% Off Your First Order</h2>
          <p>Subscribe to receive updates, access to exclusive deals and more.</p>
        </div>

        <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
    </div>

    <!-- MAIN FOOTER -->
    <div class="footer-main">
      <div class="footer-grid">

        <!-- BRAND -->
        <div class="footer-brand">
          <RouterLink to="/" class="brand-logo">
            BASTRO <span>KUTIR</span>
          </RouterLink>

          <p>
            Discover elegance in every thread. Bastro Kutir brings you
            beautiful fashion, timeless style and quality you can trust.
          </p>

          <div class="social-links">
            <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
            <a href="#" aria-label="TikTok"><i class="bi bi-tiktok"></i></a>
          </div>
        </div>

        <!-- QUICK LINKS -->
        <div class="footer-column">
          <h4>Quick Links</h4>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/shop">Shop</RouterLink>
          <RouterLink to="/categories">Categories</RouterLink>
          <RouterLink to="/deals">Special Deals</RouterLink>
          <RouterLink to="/about">About Us</RouterLink>
          <RouterLink to="/contact">Contact Us</RouterLink>
        </div>

        <!-- CUSTOMER SERVICE -->
        <div class="footer-column">
          <h4>Customer Service</h4>
          <RouterLink to="/contact">Contact Support</RouterLink>
          <RouterLink to="/shipping-policy">Shipping Policy</RouterLink>
          <RouterLink to="/return-policy">Return & Refund</RouterLink>
          <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
          <RouterLink to="/terms">Terms & Conditions</RouterLink>
          <RouterLink to="/faq">Frequently Asked Questions</RouterLink>
        </div>

        <!-- CONTACT -->
        <div class="footer-column contact-column">
          <h4>Get In Touch</h4>

          <div class="contact-item">
            <i class="bi bi-geo-alt"></i>
            <span>Mirpur, Dhaka, Bangladesh</span>
          </div>

          <div class="contact-item">
            <i class="bi bi-telephone"></i>
            <span>Contact Number</span>
          </div>

          <div class="contact-item">
            <i class="bi bi-envelope"></i>
            <span>support@bastrokutir.com</span>
          </div>

          <div class="contact-item">
            <i class="bi bi-clock"></i>
            <span>Saturday - Thursday<br />10:00 AM - 9:00 PM</span>
          </div>
        </div>

      </div>
    </div>

    <!-- PAYMENT AND COPYRIGHT -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <p class="copyright">
          © {{ currentYear }} <strong>BASTRO KUTIR</strong>.
          All Rights Reserved.
        </p>

        <div class="payment-methods">
          <span>WE ACCEPT</span>
          <strong class="payment-bkash">bKash</strong>
          <strong class="payment-nagad">Nagad</strong>
          <strong class="payment-rocket">Rocket</strong>
          <i class="bi bi-credit-card-2-front"></i>
          <i class="bi bi-bank"></i>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const currentYear = new Date().getFullYear()

function subscribeNewsletter() {
  alert('Thank you for subscribing to Bastro Kutir!')
  email.value = ''
}
</script>

<style scoped>
.footer {
  width: 100%;
  background: #171717;
  color: #fff;
  margin-top: 0;
}

/* NEWSLETTER */
.newsletter {
  background: #25211b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 38px 24px;
}

.newsletter-content {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 35px;
}

.newsletter-label {
  color: #c7a36a;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 3px;
}

.newsletter h2 {
  font-size: 23px;
  font-weight: 700;
  margin: 8px 0;
  color: #fff;
}

.newsletter p {
  color: #aaa;
  font-size: 12px;
  margin: 0;
}

.newsletter-form {
  display: flex;
  width: 420px;
  max-width: 100%;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.newsletter-form input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  padding: 14px 15px;
  font-size: 12px;
}

.newsletter-form button {
  background: #b58a48;
  color: #fff;
  border: none;
  padding: 0 22px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.2s;
}

.newsletter-form button:hover {
  background: #98713b;
}

/* MAIN FOOTER */
.footer-main {
  max-width: 1200px;
  margin: auto;
  padding: 65px 24px 55px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.25fr 1.2fr;
  gap: 45px;
}

.brand-logo {
  display: inline-block;
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  text-decoration: none;
}

.brand-logo span {
  color: #c7a36a;
}

.footer-brand > p {
  max-width: 290px;
  color: #aaa;
  font-size: 12px;
  line-height: 1.9;
  margin: 20px 0;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-links a {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c7a36a;
  border: 1px solid #45413b;
  border-radius: 50%;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.social-links a:hover {
  background: #b58a48;
  color: #fff;
  border-color: #b58a48;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-column h4 {
  color: #fff;
  font-size: 14px;
  font-weight: 750;
  margin: 5px 0 12px;
}

.footer-column > a {
  color: #aaa;
  font-size: 12px;
  text-decoration: none;
  transition: 0.2s;
}

.footer-column > a:hover {
  color: #c7a36a;
  padding-left: 4px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #aaa;
  font-size: 12px;
  line-height: 1.7;
}

.contact-item i {
  color: #c7a36a;
  font-size: 15px;
  min-width: 15px;
  margin-top: 2px;
}

/* BOTTOM */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  padding: 20px 24px;
}

.footer-bottom-inner {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.copyright {
  margin: 0;
  color: #888;
  font-size: 11px;
}

.copyright strong {
  color: #c7a36a;
}

.payment-methods {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #aaa;
}

.payment-methods > span {
  font-size: 9px;
  letter-spacing: 1px;
  font-weight: 700;
}

.payment-methods strong {
  font-size: 11px;
  font-weight: 800;
  padding: 5px 7px;
  border-radius: 3px;
  background: #fff;
}

.payment-bkash {
  color: #d12053;
}

.payment-nagad {
  color: #ed6a22;
}

.payment-rocket {
  color: #8b4bd5;
}

.payment-methods > i {
  font-size: 20px;
  color: #ccc;
}

/* RESPONSIVE */
@media (max-width: 1000px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 650px) {
  .newsletter-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .newsletter-form {
    width: 100%;
  }

  .newsletter h2 {
    font-size: 20px;
  }

  .footer-main {
    padding: 45px 22px;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 35px 20px;
  }

  .brand-logo {
    font-size: 20px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-brand > p {
    max-width: 100%;
  }

  .footer-bottom-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .payment-methods {
    flex-wrap: wrap;
  }
}

@media (max-width: 380px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-brand {
    grid-column: auto;
  }
}
</style>
