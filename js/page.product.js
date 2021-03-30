////////////////////////////////////////////// Variables //////////////////////////////////////////////

let productId = window.location.search.slice(11);
let beingWatchedProduct = null;

////////////////////////////////////////////// Execution of the script //////////////////////////////////////////////

// Global declaration of being watched product
fetchProduct(productId, "teddies")
  .then(function (product) {
    // Used by intoBasket.js
    beingWatchedProduct = product;
    //
    console.log("Écriture des nodes du DOM");
    showCardProduct(product);
    if (config.badgesEnabled) {
      showBadges();
      console.log("Écriture des badges");
    }
  })
  // Listen the button after DOM charged
  .then(() => {
    clickedButton();
  });

////////////////////////////////////////////// Fonctions //////////////////////////////////////////////

function showProductOptions(productId, productOptions) {
  let value = 1;
  for (const eachOptions of productOptions) {
    createNode(".select" + productId, "option", {className : "value=" + value, innerText : eachOptions}) 
    value++;
  }
}

function showCardProduct(product) {
  createNode("main", "section", {className : "row justify-content-around"});
  if (product) {
    createNode("section", "div", {className : "col-8 teddy" + product._id});
    createNode(".teddy" + product._id, "img", {className : "image card-img-top img-fluid " + product._id, src : product.imageUrl});
    createNode(".teddy" + product._id, "div", {className : "card-body" + product._id});
    createNode(".card-body" + product._id, "h5", {className : "card-title", innerText : product.name});
    createNode(".card-body" + product._id, "p", {className : "card-text", innerText : product.description});
    createNode(".card-body" + product._id, "select", {className : "custom-select browser-default select" + product._id});
    createNode(".select" + product._id, "option", {className : "selected",innerText :  "Choisissez votre couleur"});
    //
    showProductOptions(product._id, product.colors);
    //
    createNode(".card-body" + product._id, "p", {className : "card-text", innerText : PriceFormat(product.price)});
    createNode(".card-body" + product._id, "button", {className : "btn btn-primary addToBasket",innerText : "Ajouter au panier"});
  } else {
    console.log("Product not found");
  }
}

////////////////////////////////////////////// Fonction intoBasket //////////////////////////////////////////////

// 1 - Listen button / If clicked => Fonction pushProductInBasket() & showBadges()
function clickedButton() {
  var getButton = document.querySelector(".addToBasket");
  getButton.addEventListener("click", () => {
    pushProductInBasket(beingWatchedProduct);
    if (config.badgesEnabled) {
      showBadges();
      console.log("Écriture des badges");
    }
  });
}

function pushProductInBasket(beingWatchedProduct) {
  // Check if the key basket exist in the localstorage
  if (checkLocalStorageKey("basket")) {
    basket = getLocalstorageKey("basket");
    console.log("Des produits sont déjà dans le panier");
    // Check if the product id of the curent page is in the basket
    if (checkProductIdInBasket(basket, beingWatchedProduct._id)) {
      console.log("Le produit est déjà dans le panier");
      // Increment the quantity of the product in the basket
      incrementProductInBasket(
        getIndexOfProductInBasket(basket, beingWatchedProduct._id)
      ); // return the index of the product found in the basket
      console.log(basket);
      // Then send it to the localStorage
      sendBasketToLocalStorage(basket);
    } else {
      console.log("Le produit n'est pas dans le panier");
      // Push the product in the basket
      pushNewProductInBasket(beingWatchedProduct, basket);
      // Then send the basket to the localStorage
      sendBasketToLocalStorage(basket);
    }
  } else {
    // If the key basket doesn't exist in the localstorage
    // Initialisation of the basket
    let basket = {
      products: [],
    };
    // Push the product in the basket
    pushNewProductInBasket(beingWatchedProduct, basket);
    // Then send the basket to the localStorage
    sendBasketToLocalStorage(basket);
  }
}

function checkProductIdInBasket(basket, productId) {
  var productFound = false;
  for (let index = 0; index < basket.products.length; index++) {
    if (basket.products[index].id == productId) {
      console.log("Id du produit = " + basket.products[index].id);
      productFound = true;
      return true;
    }
  }
  if (!productFound) {
    return false;
  }
}

function getIndexOfProductInBasket(basket, productId) {
  var indexOfProduct = null;
  for (let index = 0; index < basket.products.length; index++) {
    if (basket.products[index].id == productId) {
      console.log("Index du produit trouvé = " + index);
      indexOfProduct = index;
      return indexOfProduct;
    }
  }
}

function incrementProductInBasket(index) {
  basket.products[index].quantity += 1;
}

function pushNewProductInBasket(product, basket) {
  let numberOfProduct = 1;
  basket.products.push({
    name: product.name,
    id: product._id,
    quantity: numberOfProduct,
  });
}

function sendBasketToLocalStorage(basket) {
  basketJsoned = JSON.stringify(basket);
  localStorage.setItem("basket", basketJsoned);
  console.log(JSON.parse(localStorage.getItem("basket")));
}

