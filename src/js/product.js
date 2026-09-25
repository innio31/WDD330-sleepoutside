import { getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function productDetailsTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image.replace("../", "/")}"
      alt="${product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
}

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

function addToCartHandler(product) {
  addProductToCart(product);
}

async function init() {
  const productId = getParam("product");
  const product = await dataSource.findProductById(productId);

  const productDetail = document.querySelector(".product-detail");
  productDetail.innerHTML = productDetailsTemplate(product);

  document
    .getElementById("addToCart")
    .addEventListener("click", () => addToCartHandler(product));
}

init();