import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor() {
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  // Called on page load — calculates and displays the item subtotal
  calculateItemSubtotal() {
    const cart = getLocalStorage("so-cart") || [];
    this.subtotal = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector("#subtotal").textContent = this.subtotal.toFixed(2);
  }

  // Called after zip is entered — calculates tax, shipping, and order total
  calculateOrderTotal() {
    const cart = getLocalStorage("so-cart") || [];
    const itemCount = cart.length;

    this.tax = this.subtotal * 0.06;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = this.subtotal + this.tax + this.shipping;

    document.querySelector("#tax").textContent = this.tax.toFixed(2);
    document.querySelector("#shipping").textContent = this.shipping.toFixed(2);
    document.querySelector("#order-total").textContent =
      this.orderTotal.toFixed(2);
  }
}