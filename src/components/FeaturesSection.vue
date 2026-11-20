
<template>
  <section class="features-section">
    <div class="features-container">

      <div class="feature-item">
        <div class="feature-icon">
          <i class="bi bi-truck"></i>
        </div>
        <div class="feature-content">
          <h4>Free Shipping</h4>
          <p>On orders above ৳1,000</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">
          <i class="bi bi-shield-check"></i>
        </div>
        <div class="feature-content">
          <h4>Secure Payment</h4>
          <p>100% secure payment</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">
          <i class="bi bi-headset"></i>
        </div>
        <div class="feature-content">
          <h4>24/7 Support</h4>
          <p>Dedicated support</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">
          <i class="bi bi-arrow-repeat"></i>
        </div>
        <div class="feature-content">
          <h4>Easy Returns</h4>
          <p>Hassle-free returns</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.features-section {
  width: 100%;
  padding: 35px 4%;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.features-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  transition: 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-4px);
}

.feature-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fbf4e9;
  color: #bd914c;
  font-size: 24px;
}

.feature-content h4 {
  margin: 0 0 5px;
  font-size: 15px;
  font-weight: 700;
  color: #222;
}

.feature-content p {
  margin: 0;
  font-size: 12px;
  color: #777;
}

@media (max-width: 992px) {
  .features-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .features-section {
    padding: 22px 3%;
  }

  .features-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 5px;
  }

  .feature-item {
    gap: 9px;
    padding: 8px 3px;
  }

  .feature-icon {
    width: 40px;
    height: 40px;
    font-size: 19px;
  }

  .feature-content h4 {
    font-size: 12px;
  }

  .feature-content p {
    font-size: 10px;
  }
}
</style>
