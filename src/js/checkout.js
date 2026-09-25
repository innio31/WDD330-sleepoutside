import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

renderBreadcrumbs([
  { label: "Home", href: "/index.html" },
  { label: "Checkout" },
]);

const checkout = new CheckoutProcess();
checkout.calculateItemSubtotal();

// Once the user enters a zip code, calculate the rest
document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});