
<template>
  <div class="checkout-page">
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <div class="checkout-container">
      <div class="page-heading">
        <span class="eyebrow">BASTRO KUTIR</span>
        <h2>Complete Your Order</h2>
        <p>You're just one step away from your purchase.</p>
      </div>

      <div v-if="items.length === 0" class="empty-checkout">
        <i class="bi bi-cart-x"></i>
        <h3>Your cart is empty</h3>
        <RouterLink to="/shop" class="continue-btn">
          Continue Shopping
        </RouterLink>
      </div>

      <div v-else class="checkout-grid">
        <div class="checkout-form">
          <div class="section-heading">
            <span class="step-number">01</span>
            <div>
              <h4>Delivery Information</h4>
              <p>Where should we deliver your order?</p>
            </div>
          </div>

          <form @submit.prevent="placeOrder">
            <div class="form-group">
              <label>Full Name <span>*</span></label>
              <input
                v-model="customer.name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Phone Number <span>*</span></label>
                <input
                  v-model="customer.phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>

              <div class="form-group">
                <label>Email Address</label>
                <input
                  v-model="customer.email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Delivery Address <span>*</span></label>
              <textarea
                v-model="customer.address"
                rows="3"
                placeholder="House, Road, Area, City"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label>Order Notes <small>(Optional)</small></label>
              <textarea
                v-model="customer.notes"
                rows="2"
                placeholder="Any special instructions..."
              ></textarea>
            </div>

            <div class="section-heading payment-title">
              <span class="step-number">02</span>
              <div>
                <h4>Payment Method</h4>
                <p>Choose your preferred payment method.</p>
              </div>
            </div>

            <div class="payment-methods">
              <label
                class="payment-card"
                :class="{ active: customer.payment === 'Cash on Delivery' }"
              >
                <input
                  v-model="customer.payment"
                  type="radio"
                  value="Cash on Delivery"
                />
                <span class="payment-icon cod-icon">
                  <i class="bi bi-cash-stack"></i>
                </span>
                <span class="payment-details">
                  <strong>Cash on Delivery</strong>
                  <small>Pay when you receive your order</small>
                </span>
                <i class="bi bi-check-circle-fill selected-check"></i>
              </label>

              <label
                class="payment-card"
                :class="{ active: customer.payment === 'Online Payment' }"
              >
                <input
                  v-model="customer.payment"
                  type="radio"
                  value="Online Payment"
                />
                <span class="payment-icon online-icon">
                  <i class="bi bi-credit-card"></i>
                </span>
                <span class="payment-details">
                  <strong>Online Payment</strong>
                  <small>Pay securely using your preferred method</small>
                </span>
                <i class="bi bi-check-circle-fill selected-check"></i>
              </label>
            </div>

            <div
              v-if="customer.payment === 'Online Payment'"
              class="online-payment-box"
            >
              <h5>Select Payment Option</h5>
              <p>Choose how you want to pay.</p>

              <div class="online-options">
                <label
                  v-for="method in onlineMethods"
                  :key="method.value"
                  class="online-option"
                  :class="{
                    selected: customer.onlineMethod === method.value
                  }"
                >
                  <input
                    v-model="customer.onlineMethod"
                    type="radio"
                    :value="method.value"
                    required
                  />
                  <span
                    class="method-logo"
                    :class="method.class"
                  >
                    <i :class="method.icon"></i>
                  </span>
                  <strong>{{ method.label }}</strong>
                  <i class="bi bi-check-circle-fill method-check"></i>
                </label>
              </div>

              <div class="payment-info">
                <i class="bi bi-info-circle"></i>
                <span>
                  Online payment integration will be available soon.
                  This is currently a demo selection.
                </span>
              </div>
            </div>

            <button type="submit" class="place-order-btn">
              Place Order
              <i class="bi bi-arrow-right"></i>
            </button>

            <div class="checkout-security">
              <i class="bi bi-shield-lock"></i>
              Your information is kept secure.
            </div>
          </form>
        </div>

        <aside class="order-summary">
          <h4>Order Summary</h4>
          <p class="summary-subtitle">
            {{ cartCount }} items in your cart
          </p>

          <div class="summary-products">
            <div
              v-for="item in items"
              :key="item.id"
              class="summary-product"
            >
              <div class="product-image">
                <img :src="item.image" :alt="item.name" />
                <span>{{ item.quantity }}</span>
              </div>

              <div class="product-info">
                <h6>{{ item.name }}</h6>
                <p>৳{{ Number(item.price).toLocaleString() }}</p>
              </div>

              <strong>
                ৳{{ (item.price * item.quantity).toLocaleString() }}
              </strong>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row">
            <span>Subtotal</span>
            <strong>৳{{ cartTotal.toLocaleString() }}</strong>
          </div>

          <div class="summary-row">
            <span>Shipping</span>
            <strong class="shipping-text">Calculated later</strong>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-total">
            <span>Grand Total</span>
            <strong>৳{{ cartTotal.toLocaleString() }}</strong>
          </div>

          <div class="summary-benefit">
            <i class="bi bi-truck"></i>
            <div>
              <strong>Delivery Available</strong>
              <small>Shipping details will be confirmed.</small>
            </div>
          </div>

          <div class="summary-benefit">
            <i class="bi bi-arrow-repeat"></i>
            <div>
              <strong>Easy Returns</strong>
              <small>Customer-friendly return policy.</small>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <FooterView />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import HeaderView from '../components/HeaderView.vue'
import { useCart } from '../stores/cart'
import FooterView from '../components/FooterView.vue'
const router = useRouter()

const {
  items,
  cartCount,
  cartTotal,
  clearCart
} = useCart()

const customer = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
  payment: 'Cash on Delivery',
  onlineMethod: ''
})

const onlineMethods = [
  {
    label: 'bKash',
    value: 'bKash',
    icon: 'bi bi-phone',
    class: 'bkash'
  },
  {
    label: 'Nagad',
    value: 'Nagad',
    icon: 'bi bi-wallet2',
    class: 'nagad'
  },
  {
    label: 'Rocket',
    value: 'Rocket',
    icon: 'bi bi-send',
    class: 'rocket'
  },
  {
    label: 'Cards',
    value: 'Card',
    icon: 'bi bi-credit-card-2-front',
    class: 'cards'
  },
  {
    label: 'Bank Transfer',
    value: 'Bank Transfer',
    icon: 'bi bi-bank',
    class: 'bank'
  }
]

function placeOrder() {
  if (customer.payment === 'Online Payment' && !customer.onlineMethod) {
    alert('Please select an online payment option.')
    return
  }

  const orderId = 'BK-' + Date.now().toString().slice(-8)

  const order = {
    order_id: orderId,
    customer: { ...customer },
    products: items.value.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    subtotal: cartTotal.value,
    payment_method: customer.payment,
    online_payment_method:
      customer.payment === 'Online Payment'
        ? customer.onlineMethod
        : null,
    created_at: new Date().toISOString()
  }

  sessionStorage.setItem(
    'bastro_kutir_last_order',
    JSON.stringify(order)
  )

  clearCart()

  router.push('/order-success')
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f7f7f7;
  color: #252525;
}

.checkout-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 55px 24px 80px;
}

.page-heading {
  text-align: center;
  margin-bottom: 42px;
}

.eyebrow {
  display: inline-block;
  color: #b58a48;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.page-heading h2 {
  font-size: 35px;
  font-weight: 750;
  margin: 0;
  color: #222;
}

.page-heading p {
  color: #888;
  font-size: 14px;
  margin-top: 10px;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1.45fr 0.85fr;
  gap: 30px;
  align-items: start;
}

.checkout-form,
.order-summary {
  background: #fff;
  border: 1px solid #ededed;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.025);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.step-number {
  width: 38px;
  height: 38px;
  min-width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f8f1e6;
  color: #a77c3c;
  font-size: 14px;
  font-weight: 800;
}

.section-heading h4 {
  font-size: 18px;
  font-weight: 750;
  margin: 0 0 4px;
}

.section-heading p {
  color: #999;
  font-size: 12px;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 650;
  margin-bottom: 9px;
  color: #444;
}

.form-group label span {
  color: #d44d4d;
}

.form-group label small {
  color: #999;
  font-weight: 400;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #e3e3e3;
  border-radius: 7px;
  outline: none;
  background: #fff;
  font-size: 13px;
  transition: 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #b58a48;
  box-shadow: 0 0 0 3px rgba(181, 138, 72, 0.09);
}

.form-group textarea {
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.payment-title {
  margin-top: 35px;
  margin-bottom: 20px;
}

.payment-methods {
  display: grid;
  gap: 12px;
}

.payment-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 9px;
  cursor: pointer;
  transition: 0.2s;
}

.payment-card:hover {
  border-color: #c5a36e;
}

.payment-card.active {
  border-color: #b58a48;
  background: #fdfaf5;
}

.payment-card input,
.online-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.payment-icon {
  width: 43px;
  height: 43px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.cod-icon {
  background: #edf7ee;
  color: #39864b;
}

.online-icon {
  background: #f8f1e6;
  color: #a77c3c;
}

.payment-details {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
}

.payment-details strong {
  font-size: 13px;
}

.payment-details small {
  color: #999;
  font-size: 11px;
}

.selected-check {
  color: #b58a48;
  font-size: 19px;
  opacity: 0;
}

.payment-card.active .selected-check {
  opacity: 1;
}

.online-payment-box {
  margin-top: 17px;
  padding: 22px;
  background: #fcfaf6;
  border: 1px solid #eee4d4;
  border-radius: 9px;
  animation: reveal 0.25s ease;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(-7px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.online-payment-box h5 {
  font-size: 15px;
  font-weight: 750;
  margin: 0 0 5px;
}

.online-payment-box > p {
  color: #999;
  font-size: 12px;
  margin-bottom: 18px;
}

.online-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.online-option {
  position: relative;
  min-height: 105px;
  padding: 13px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  background: #fff;
  border: 1px solid #e9e4dc;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.online-option:hover {
  border-color: #c4a16c;
  transform: translateY(-2px);
}

.online-option.selected {
  border: 1.5px solid #b58a48;
  background: #fffaf1;
}

.method-logo {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  font-size: 21px;
}

.method-logo.bkash {
  background: #fff0f4;
  color: #d12053;
}

.method-logo.nagad {
  background: #fff3e9;
  color: #ed6a22;
}

.method-logo.rocket {
  background: #f3edff;
  color: #8b4bd5;
}

.method-logo.cards {
  background: #edf2ff;
  color: #3159a9;
}

.method-logo.bank {
  background: #edf5f0;
  color: #32714d;
}

.online-option strong {
  font-size: 11px;
  color: #444;
}

.method-check {
  position: absolute;
  top: 7px;
  right: 7px;
  font-size: 13px;
  color: #b58a48;
  opacity: 0;
}

.online-option.selected .method-check {
  opacity: 1;
}

.payment-info {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-top: 18px;
  padding: 12px;
  border-radius: 6px;
  background: #fff;
  color: #8c7756;
  font-size: 11px;
  line-height: 1.6;
}

.payment-info i {
  font-size: 15px;
}

.place-order-btn {
  width: 100%;
  margin-top: 25px;
  padding: 16px;
  background: #b58a48;
  border: none;
  border-radius: 7px;
  color: #fff;
  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  transition: 0.2s;
}

.place-order-btn:hover {
  background: #96713b;
}

.place-order-btn i {
  margin-left: 8px;
}

.checkout-security {
  margin-top: 14px;
  text-align: center;
  font-size: 11px;
  color: #999;
}

.checkout-security i {
  margin-right: 5px;
  color: #559567;
}

.order-summary {
  position: sticky;
  top: 20px;
}

.order-summary h4 {
  font-size: 19px;
  font-weight: 750;
  margin: 0 0 5px;
}

.summary-subtitle {
  font-size: 12px;
  color: #999;
  margin-bottom: 25px;
}

.summary-products {
  display: grid;
  gap: 20px;
}

.summary-product {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-image {
  width: 62px;
  height: 70px;
  position: relative;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.product-image span {
  position: absolute;
  top: -7px;
  right: -7px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b58a48;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-info h6 {
  font-size: 12px;
  font-weight: 650;
  margin: 0 0 6px;
  line-height: 1.5;
}

.product-info p {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.summary-product > strong {
  font-size: 12px;
  white-space: nowrap;
}

.summary-divider {
  border-top: 1px solid #eee;
  margin: 22px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 13px;
}

.summary-row span {
  color: #888;
}

.summary-row strong {
  font-weight: 650;
}

.shipping-text {
  font-size: 11px;
  color: #a77c3c;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 750;
}

.summary-total strong {
  font-size: 20px;
  color: #b58a48;
}

.summary-benefit {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 23px;
  padding-top: 17px;
  border-top: 1px solid #f0f0f0;
}

.summary-benefit > i {
  color: #b58a48;
  font-size: 21px;
}

.summary-benefit div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-benefit strong {
  font-size: 11px;
}

.summary-benefit small {
  font-size: 10px;
  color: #999;
}

.empty-checkout {
  text-align: center;
  padding: 70px 20px;
  background: #fff;
  border-radius: 12px;
}

.empty-checkout > i {
  font-size: 55px;
  color: #bbb;
}

.empty-checkout h3 {
  margin: 15px 0 25px;
}

.continue-btn {
  display: inline-block;
  background: #b58a48;
  color: #fff;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
}

@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}

@media (max-width: 550px) {
  .checkout-container {
    padding: 35px 14px 55px;
  }

  .checkout-form,
  .order-summary {
    padding: 22px 17px;
  }

  .page-heading h2 {
    font-size: 27px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .online-options {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
