import { getLocalStorage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

export default class CheckoutProcess {
  constructor() {
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  calculateItemSubtotal() {
    const cart = getLocalStorage("so-cart") || [];
    this.subtotal = cart.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector("#subtotal").textContent = this.subtotal.toFixed(2);
  }

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

  async checkout(form) {
    const order = formDataToJSON(form);
    const cart = getLocalStorage("so-cart") || [];

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(cart);

    try {
      const response = await services.checkout(order);
      return response;
    } catch (err) {
      console.error("Checkout error:", err);
      throw err;
    }
  }
}