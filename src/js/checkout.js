import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

renderBreadcrumbs([
  { label: "Home", href: "/index.html" },
  { label: "Checkout" },
]);

const checkout = new CheckoutProcess();
checkout.calculateItemSubtotal();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    checkout.calculateOrderTotal();

    const form = event.target;
    const response = await checkout.checkout(form);
    if (response) {
      localStorage.removeItem("so-cart");
      console.log("Order placed:", response);
      window.location.href = "/index.html";
    }
  });