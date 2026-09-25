import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {
  loadHeaderFooter,
  getParam,
  renderBreadcrumbs,
} from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";
const displayName = category
  .split("-")
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(" ");

renderBreadcrumbs([
  { label: "Home", href: "/index.html" },
  { label: `Products: ${displayName}` },
]);

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();