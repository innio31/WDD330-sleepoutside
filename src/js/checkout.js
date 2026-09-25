import {
  loadHeaderFooter,
  renderBreadcrumbs,
  alertMessage,
} from "./utils.mjs";
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
    try {
      await checkout.checkout(form);
      localStorage.removeItem("so-cart");
      window.location.href = "/checkout/success.html";
    } catch (err) {
      let message = "There was a problem processing your order.";

      if (err && err.message) {
        const body = err.message;

        if (typeof body === "string") {
          message = body;
        } else if (body.message) {
          message = body.message;
        } else if (typeof body === "object") {
          // server returns { fieldName: "error message", ... }
          message = Object.values(body)
            .filter((v) => typeof v === "string")
            .join(" ");
        }
      }

      alertMessage(message, true);
    }
  });