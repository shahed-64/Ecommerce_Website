
<template>
  <div class="success-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <main class="success-container">
      <div class="success-card">
        <div class="success-icon">
          <i class="bi bi-check-lg"></i>
        </div>

        <span class="success-eyebrow">BASTRO KUTIR</span>
        <h1>Thank You for Your Order!</h1>
        <p class="success-message">
          Your order has been received successfully.
          We're excited to get your items to you.
        </p>

        <div class="order-id-box">
          <span>ORDER NUMBER</span>
          <strong>{{ order.order_id || 'BK-DEMO-0001' }}</strong>
          <small>
            <i class="bi bi-clock"></i>
            {{ order.created_at ? formatDate(order.created_at) : 'Demo Order' }}
          </small>
        </div>

        <div class="status-row">
          <span>Order Status</span>
          <span class="status-badge">
            <i class="bi bi-check-circle-fill"></i>
            Order Placed
          </span>
        </div>

        <div class="details-grid">
          <section class="detail-section">
            <h4>
              <i class="bi bi-person"></i>
              Delivery Information
            </h4>

            <div class="detail-content">
              <strong>{{ order.customer?.name || 'Customer' }}</strong>
              <p>{{ order.customer?.phone || 'N/A' }}</p>
              <p>{{ order.customer?.email || 'No email provided' }}</p>
              <p>{{ order.customer?.address || 'Address not available' }}</p>
            </div>
          </section>

          <section class="detail-section">
            <h4>
              <i class="bi bi-credit-card"></i>
              Payment Information
            </h4>

            <div class="detail-content">
              <p>
                <span>Payment Method</span>
                <strong>{{ order.payment_method || 'Cash on Delivery' }}</strong>
              </p>

              <p v-if="order.online_payment_method">
                <span>Selected Option</span>
                <strong>{{ order.online_payment_method }}</strong>
              </p>

              <p>
                <span>Payment Status</span>
                <strong class="unpaid-status">Pending</strong>
              </p>
            </div>
          </section>
        </div>

        <section class="products-section">
          <h4>Order Details</h4>

          <div
            v-for="item in order.products || []"
            :key="item.id"
            class="product-row"
          >
            <div class="product-info">
              <strong>{{ item.name }}</strong>
              <small>
                ৳{{ Number(item.price).toLocaleString() }}
                × {{ item.quantity }}
              </small>
            </div>

            <strong>
              ৳{{ (item.price * item.quantity).toLocaleString() }}
            </strong>
          </div>

          <div class="total-row">
            <span>Grand Total</span>
            <strong>
              ৳{{ Number(order.subtotal || 0).toLocaleString() }}
            </strong>
          </div>
        </section>

        <div v-if="order.customer?.notes" class="notes-box">
          <strong>Order Notes:</strong>
          <p>{{ order.customer.notes }}</p>
        </div>

        <div class="success-actions">
          <RouterLink to="/shop" class="shop-btn">
            <i class="bi bi-bag"></i>
            Continue Shopping
          </RouterLink>

          <RouterLink to="/" class="home-btn">
            Back to Home
          </RouterLink>
        </div>

        <p class="support-text">
          Need help with your order?
          <RouterLink to="/contact">Contact Us</RouterLink>
        </p>
      </div>
    </main>
      <FooterView />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderView from '../components/HeaderView.vue'
import { useCart } from '../stores/cart'
import FooterView from '../components/FooterView.vue'
const {
  cartCount,
  cartTotal
} = useCart()

const savedOrder = sessionStorage.getItem('bastro_kutir_last_order')

const order = ref(
  savedOrder
    ? JSON.parse(savedOrder)
    : {}
)

function formatDate(date) {
  return new Date(date).toLocaleString('en-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  background: #f7f7f7;
  color: #252525;
}

.success-container {
  max-width: 850px;
  margin: 0 auto;
  padding: 55px 20px 80px;
}

.success-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 45px;
  box-shadow: 0 8px 35px rgba(0, 0, 0, 0.035);
}

.success-icon {
  width: 75px;
  height: 75px;
  margin: 0 auto 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaf6ed;
  color: #39864b;
  font-size: 38px;
}

.success-eyebrow {
  display: block;
  text-align: center;
  color: #b58a48;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 3px;
}

.success-card h1 {
  text-align: center;
  font-size: 29px;
  font-weight: 750;
  margin: 12px 0;
}

.success-message {
  max-width: 480px;
  margin: 0 auto 28px;
  text-align: center;
  color: #888;
  font-size: 13px;
  line-height: 1.7;
}

.order-id-box {
  padding: 20px;
  text-align: center;
  border: 1px dashed #d8c5a5;
  background: #fcfaf6;
  border-radius: 9px;
}

.order-id-box span,
.order-id-box small {
  display: block;
  color: #999;
  font-size: 10px;
  letter-spacing: 1px;
}

.order-id-box strong {
  display: block;
  margin: 7px 0;
  font-size: 21px;
  color: #a77c3c;
  letter-spacing: 1px;
}

.order-id-box small {
  letter-spacing: 0;
}

.order-id-box small i {
  margin-right: 4px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  font-size: 13px;
  font-weight: 650;
}

.status-badge {
  padding: 7px 12px;
  border-radius: 20px;
  background: #eaf6ed;
  color: #39864b;
  font-size: 11px;
}

.status-badge i {
  margin-right: 4px;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  padding: 27px 0;
  border-bottom: 1px solid #eee;
}

.detail-section h4,
.products-section h4 {
  font-size: 14px;
  font-weight: 750;
  margin-bottom: 17px;
}

.detail-section h4 i {
  margin-right: 7px;
  color: #b58a48;
}

.detail-content {
  font-size: 12px;
  line-height: 1.8;
  color: #777;
  overflow-wrap: anywhere;
}

.detail-content > strong {
  display: block;
  color: #333;
  margin-bottom: 5px;
}

.detail-content p {
  margin: 3px 0;
}

.detail-content p span {
  display: block;
  color: #999;
  font-size: 11px;
}

.detail-content p strong {
  color: #444;
  font-weight: 650;
}

.unpaid-status {
  color: #b58a48 !important;
}

.products-section {
  padding: 27px 0 10px;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 13px 0;
  border-bottom: 1px solid #f1f1f1;
  font-size: 12px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product-info strong {
  font-size: 12px;
}

.product-info small {
  color: #999;
  font-size: 11px;
}

.product-row > strong {
  white-space: nowrap;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  font-size: 15px;
  font-weight: 750;
}

.total-row strong {
  color: #b58a48;
  font-size: 21px;
}

.notes-box {
  margin-top: 20px;
  padding: 15px;
  background: #faf8f4;
  border-radius: 7px;
  font-size: 12px;
}

.notes-box p {
  margin: 6px 0 0;
  color: #777;
}

.success-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.shop-btn,
.home-btn {
  padding: 13px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: 0.2s;
}

.shop-btn {
  background: #b58a48;
  color: #fff;
}

.shop-btn:hover {
  background: #96713b;
  color: #fff;
}

.shop-btn i {
  margin-right: 6px;
}

.home-btn {
  border: 1px solid #ddd;
  color: #555;
}

.home-btn:hover {
  border-color: #b58a48;
  color: #a77c3c;
}

.support-text {
  margin: 25px 0 0;
  text-align: center;
  font-size: 11px;
  color: #999;
}

.support-text a {
  color: #a77c3c;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 600px) {
  .success-container {
    padding: 25px 12px 45px;
  }

  .success-card {
    padding: 28px 18px;
  }

  .success-card h1 {
    font-size: 23px;
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .success-actions {
    flex-direction: column;
  }

  .shop-btn,
  .home-btn {
    width: 100%;
  }
}
</style>
