////////////////////////////////////////////// Fonctions used a few times in other files //////////////////////////////////////////////

function getLocalstorageKey(key) {
  let localStorageItem = JSON.parse(localStorage.getItem(key));
  return localStorageItem;
}
function checkLocalStorageKey(keyName) {
  var keyFound = false;
  for (key = 0; key < localStorage.length; key++) {
    if (localStorage.key(key) == keyName) {
      console.log("Clé " + keyName + " trouvé");
      keyFound = true;
      return true;
    }
  }
  if (!keyFound) {
    return false;
  }
}
//Price in cents to euros
function centsToEuros(priceInCents){
  let result = priceInCents / 100;
  return result;
}

// Format price
function PriceFormat(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(centsToEuros(price));
}

// Return the quantity of products put in the basket
function getQuantityOfProductsInBasket(basket) {
  let quantity = 0;
  let quantityOfProducts = 0;
  for (var product = 0; product < basket.products.length; product++) {
    quantity = basket.products[product].quantity;
    quantityOfProducts += quantity;
  }
  return quantityOfProducts;
}

////////////////////////////////////////////// Fonctions about DOM elements showed on pages //////////////////////////////////////////////

// Create a node with the location, tag and a list of attributs
function createNode(location, tag, ListOfAttributs = {}) {
  
  let node = document.querySelector(location);
  let createdTag = document.createElement(tag);

  // Get the list of attributs and creates tag(s) in fonction of it
  for(const [key, value] of Object.entries(ListOfAttributs)){
    createdTag[key] = value;
  }
  node.appendChild(createdTag);
}
// Show a message on the page when an error of connection happen
function showErrorConnection(message) {
  let getShowBasket = document.querySelector("#showBasket");
  if(getShowBasket != null){
    getShowBasket.style.display = "none";
  }
  let getShowForm = document.querySelector("#showForm");
  if(getShowForm != null){
    getShowForm.style.display = "none";
  }
  createNode("main", "div", {id : "error", className : "card col text-center text-light bg-danger", innerText : message});
}
// Show a message on the page basket.html when the basket is empty
function emptyBasket() {
  let getShowBasket = document.querySelector("#showBasket");
  getShowBasket.style.display = "none";
  let getShowForm = document.querySelector("#showForm");
  getShowForm.style.display = "none";
  createNode("main", "div", {id : "error", className : "card col text-center text-info mx-aut",innerText : "Votre panier est vide."});
}

// Show the number of products on the basket button
// Enabled in config.js
function showBadges() {
  let badgesSpan = document.querySelector(".badge");
  if (checkLocalStorageKey("basket")) {
    nbProducts = getQuantityOfProductsInBasket(getLocalstorageKey("basket"));
  } else {
    nbProducts = "";
  }
  badgesSpan.innerHTML = nbProducts;
}


