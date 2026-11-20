
<template>
  <div class="cart-page">
    <!-- HEADER -->
    <HeaderView
      :cart-count="cartCount"
      :cart-total="cartTotal"
    />

    <main class="cart-container">
      <div class="cart-heading">
        <div>
          <span class="heading-subtitle">YOUR SHOPPING BAG</span>
          <h1>Shopping Cart</h1>
          <p>Review your selected products before checkout.</p>
        </div>

        <RouterLink to="/shop" class="continue-shopping">
          <i class="bi bi-arrow-left"></i>
          Continue Shopping
        </RouterLink>
      </div>

      <!-- EMPTY CART -->
      <div v-if="items.length === 0" class="empty-cart">
        <div class="empty-cart-icon">
          <i class="bi bi-bag"></i>
        </div>

        <h2>Your Cart is Empty!</h2>
        <p>You haven't added any products to your shopping cart yet.</p>

        <RouterLink to="/shop" class="shop-now-btn">
          Start Shopping
          <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <!-- CART CONTENT -->
      <div v-else class="cart-layout">

        <!-- PRODUCT TABLE -->
        <section class="cart-products">
          <div class="cart-table-header">
            <h3>Cart Items ({{ cartCount }})</h3>
            <span>Price and quantity details</span>
          </div>

          <div class="cart-item-list">
            <div
              v-for="item in items"
              :key="item.id"
              class="cart-item"
            >
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>

              <div class="item-details">
                <span class="item-category">{{ item.category }}</span>

                <RouterLink
                  :to="`/product/${item.id}`"
                  class="item-name"
                >
                  {{ item.name }}
                </RouterLink>

                <div class="item-price-mobile">
                  ৳{{ item.price.toLocaleString('en-BD') }}
                </div>

                <button
                  class="remove-btn"
                  @click="removeFromCart(item.id)"
                >
                  <i class="bi bi-trash3"></i>
                  Remove
                </button>
              </div>

              <div class="item-unit-price">
                ৳{{ item.price.toLocaleString('en-BD') }}
              </div>

              <div class="quantity-control">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{{ item.quantity }}</span>

                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div class="item-subtotal">
                ৳{{ (item.price * item.quantity).toLocaleString('en-BD') }}
              </div>

              <button
                class="remove-icon-btn"
                @click="removeFromCart(item.id)"
                aria-label="Remove product"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          <div class="cart-bottom-actions">
            <RouterLink to="/shop" class="back-to-shop">
              <i class="bi bi-arrow-left"></i>
              Continue Shopping
            </RouterLink>

            <button class="clear-cart-btn" @click="clearCart">
              <i class="bi bi-trash3"></i>
              Clear Cart
            </button>
          </div>
        </section>

        <!-- ORDER SUMMARY -->
        <aside class="order-summary">
          <h3>Order Summary</h3>

          <div class="summary-row">
            <span>Subtotal</span>
            <strong>৳{{ cartTotal.toLocaleString('en-BD') }}</strong>
          </div>

          <div class="summary-row">
            <span>Shipping</span>
            <strong class="shipping-text">Calculated at checkout</strong>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-total">
            <span>Grand Total</span>
            <strong>৳{{ cartTotal.toLocaleString('en-BD') }}</strong>
          </div>

          <p class="shipping-note">
            <i class="bi bi-info-circle"></i>
            Delivery charge will be added during checkout.
          </p>

          <button class="checkout-btn" @click="goToCheckout">
            Proceed to Checkout
            <i class="bi bi-arrow-right"></i>
          </button>

          <div class="secure-payment">
            <i class="bi bi-shield-check"></i>
            Secure Shopping Experience
          </div>
        </aside>

      </div>
    </main>
    <FooterView />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeaderView from '../components/HeaderView.vue'
import { useCart } from '../stores/cart'
import FooterView from '../components/FooterView.vue'
const router = useRouter()

const {
  items,
  cartCount,
  cartTotal,
  removeFromCart,
  updateQuantity,
  clearCart
} = useCart()

function goToCheckout() {
  router.push('/checkout')
}
</script>

<style scoped>
.cart-page {
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}

.cart-container {
  width: 100%;
  max-width: 1440px;
  min-height: 70vh;
  margin: 0 auto;
  padding: 55px 4% 80px;
}

.cart-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 35px;
}

.heading-subtitle {
  display: block;
  margin-bottom: 10px;
  color: #bd914c;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.cart-heading h1 {
  margin: 0 0 8px;
  color: #222;
  font-size: 34px;
  font-weight: 700;
}

.cart-heading p {
  margin: 0;
  color: #777;
  font-size: 14px;
}

.continue-shopping,
.back-to-shop {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #a77c35;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.continue-shopping:hover,
.back-to-shop:hover {
  color: #76521f;
}

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  align-items: start;
  gap: 25px;
}

.cart-products,
.order-summary {
  border: 1px solid #eee;
  background: #fff;
}

.cart-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  border-bottom: 1px solid #eee;
}

.cart-table-header h3,
.order-summary h3 {
  margin: 0;
  color: #222;
  font-size: 18px;
  font-weight: 700;
}

.cart-table-header span {
  color: #999;
  font-size: 12px;
}

.cart-item {
  display: grid;
  grid-template-columns: 90px minmax(120px, 1fr) 100px 110px 110px 25px;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 90px;
  height: 105px;
  overflow: hidden;
  background: #f7f5f2;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-category {
  display: block;
  margin-bottom: 6px;
  color: #a77c35;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.item-name {
  display: block;
  color: #222;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  line-height: 1.5;
}

.item-name:hover {
  color: #bd914c;
}

.item-unit-price,
.item-subtotal {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}

.item-subtotal {
  text-align: right;
}

.item-price-mobile {
  display: none;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border: 1px solid #ddd;
}

.quantity-control button {
  width: 30px;
  height: 32px;
  border: none;
  background: #f7f7f7;
  color: #333;
  font-size: 18px;
  cursor: pointer;
}

.quantity-control span {
  min-width: 32px;
  color: #333;
  font-size: 13px;
  text-align: center;
}

.remove-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 0;
  border: none;
  background: transparent;
  color: #b84a4a;
  font-size: 11px;
  cursor: pointer;
}

.remove-btn:hover {
  color: #8c2020;
}

.remove-icon-btn {
  border: none;
  background: transparent;
  color: #aaa;
  cursor: pointer;
}

.remove-icon-btn:hover {
  color: #c33;
}

.cart-bottom-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.clear-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  border: 1px solid #ddd;
  background: #fff;
  color: #777;
  font-size: 12px;
  cursor: pointer;
}

.clear-cart-btn:hover {
  border-color: #b84a4a;
  color: #b84a4a;
}

/* ORDER SUMMARY */

.order-summary {
  padding: 25px;
}

.order-summary h3 {
  margin-bottom: 25px;
}

.summary-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  color: #777;
  font-size: 13px;
}

.summary-row strong {
  color: #333;
  font-size: 13px;
  text-align: right;
}

.shipping-text {
  max-width: 145px;
  color: #a77c35 !important;
  font-size: 11px !important;
}

.summary-divider {
  height: 1px;
  margin: 22px 0;
  background: #eee;
}

.summary-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #222;
  font-size: 15px;
  font-weight: 700;
}

.summary-total strong {
  color: #a77c35;
  font-size: 21px;
}

.shipping-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 22px 0;
  color: #888;
  font-size: 11px;
  line-height: 1.6;
}

.shipping-note i {
  color: #bd914c;
}

.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 15px;
  border: none;
  background: #bd914c;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.checkout-btn:hover {
  background: #a77c35;
}

.secure-payment {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
  color: #777;
  font-size: 11px;
}

.secure-payment i {
  color: #599c68;
  font-size: 16px;
}

/* EMPTY CART */

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  padding: 40px 20px;
  border: 1px solid #eee;
  background: #fff;
  text-align: center;
}

.empty-cart-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 95px;
  margin-bottom: 22px;
  border-radius: 50%;
  background: #fbf4e9;
  color: #bd914c;
  font-size: 40px;
}

.empty-cart h2 {
  margin-bottom: 10px;
  color: #222;
  font-size: 24px;
  font-weight: 700;
}

.empty-cart p {
  margin-bottom: 25px;
  color: #888;
  font-size: 14px;
}

.shop-now-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 25px;
  background: #bd914c;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.shop-now-btn:hover {
  background: #a77c35;
  color: #fff;
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .cart-layout {
    grid-template-columns: minmax(0, 1fr) 300px;
  }

  .cart-item {
    grid-template-columns: 75px minmax(100px, 1fr) 85px 95px 90px 20px;
    gap: 10px;
    padding: 15px;
  }

  .item-image {
    width: 75px;
    height: 90px;
  }
}

@media (max-width: 850px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .order-summary {
    max-width: none;
  }
}

@media (max-width: 600px) {
  .cart-container {
    padding: 35px 4% 55px;
  }

  .cart-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .cart-heading h1 {
    font-size: 28px;
  }

  .cart-table-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 7px;
    padding: 16px;
  }

  .cart-item {
    position: relative;
    grid-template-columns: 75px minmax(0, 1fr) 25px;
    gap: 12px;
    padding: 15px;
  }

  .item-image {
    width: 75px;
    height: 95px;
  }

  .item-details {
    align-self: start;
  }

  .item-name {
    font-size: 13px;
  }

  .item-price-mobile {
    display: block;
    margin-top: 7px;
    color: #333;
    font-size: 13px;
    font-weight: 600;
  }

  .item-unit-price {
    display: none;
  }

  .quantity-control {
    grid-column: 2;
    grid-row: 2;
    margin-top: -5px;
  }

  .item-subtotal {
    grid-column: 2;
    grid-row: 3;
    text-align: left;
  }

  .remove-icon-btn {
    grid-column: 3;
    grid-row: 1;
  }

  .remove-btn {
    margin-top: 7px;
  }

  .cart-bottom-actions {
    gap: 12px;
    padding: 15px;
  }

  .back-to-shop {
    font-size: 11px;
  }

  .clear-cart-btn {
    padding: 8px;
    font-size: 10px;
  }

  .order-summary {
    padding: 20px;
  }

  .empty-cart {
    min-height: 350px;
  }
}
</style>
