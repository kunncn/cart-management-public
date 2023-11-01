import { cartObserver, createCartUi } from "./app/cart";
import { categoryRender } from "./app/category";
import { productRender } from "./app/product";
import {
  cartBtnHandler,
  categoryListsHandler,
  orderNowHandler,
  searchHandler,
} from "./core/handlers";
import {
  cartBtn,
  cartBtnCount,
  cartItems,
  categoryLists,
  closeCart,
  orderNow,
  productSection,
  searchBtn,
} from "./core/selectors";
import { categories, products } from "./core/variables";

export class Shop {
  preRender() {
    categoryRender(categories);
    const carts = localStorage.getItem("carts");
    if (carts !== null) {
      const jsonParsedCarts = JSON.parse(carts);
      jsonParsedCarts.forEach((el) => productRender(products, jsonParsedCarts));
      const disabledProductIds = Array.from(
        productSection.querySelectorAll('[disabled="true"]')
      ).map((el) =>
        Number(el.closest(".product-card").getAttribute("data-id"))
      );

      const filteredProducts = products.filter((product) =>
        disabledProductIds.includes(product.id)
      );

      cartBtnCount.innerText = filteredProducts.length;

      filteredProducts.forEach((product) =>
        cartItems.append(createCartUi(product))
      );
    } else {
      productRender(products);
    }
  }

  listener() {
    cartBtn.addEventListener("click", cartBtnHandler);
    closeCart.addEventListener("click", cartBtnHandler);
    categoryLists.addEventListener("click", categoryListsHandler);
    orderNow.addEventListener("click", orderNowHandler);
    searchBtn.addEventListener("click", () => {
      searchHandler();
    });
  }

  observer() {
    cartObserver();
  }

  init() {
    this.observer();
    this.preRender();
    this.listener();
  }
}
