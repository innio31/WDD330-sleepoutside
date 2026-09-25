import { loadHeaderFooter, renderBreadcrumbs } from "./utils.mjs";

loadHeaderFooter();

renderBreadcrumbs([
  { label: "Home", href: "/index.html" },
  { label: "Checkout" },
]);