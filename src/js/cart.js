import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

renderBreadcrumbs([
  { label: "Home", href: "/index.html" },
  { label: "Cart" },
]);

const listElement = document.querySelector(".product-list");
const cart = new ShoppingCart(listElement);
cart.init();