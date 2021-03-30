////////////////////////////////////////////// Variables //////////////////////////////////////////////
let order = {
  contact: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  },
  products: "",
};

////////////////////////////////////////////// Execution of the script //////////////////////////////////////////////

if (checkLocalStorageKey("basket") === true) {
  console.log("Verification passée");
  fetchProducts("teddies")
    .then((products) => {
      showBasket(getLocalstorageKey("basket"), products);
      if (config.badgesEnabled) {
        showBadges();
        console.log("Écriture des badges");
      }
    })
    .then(() => {
      setProductsToOrder();
      // Create a list of fields used in setEventForField()
      const fields = ["firstName", "lastName", "address", "city", "email"];
      // Create an event for each field to set the input of the user in the order.contact
      fields.forEach((field) => setEventForField(field));
      //
      sendOrderToServerByClickOnButton();
    })
    .then(() => {
      clearBasket();
    });
} else {
  emptyBasket();
}

////////////////////////////////////////////// Fonction //////////////////////////////////////////////
function clearBasket() {
  let button = document.querySelector("#clear");

  button.addEventListener("click", (e) => {
    //e.preventDefault();
    console.log("Vidage du panier");
    localStorage.removeItem("basket");
    // Reload the page
    window.location.reload();
  });
}

function showBasket(basket, products) {
  let totalPrice = 0;
  // Browse the array containing id products
  for (let index = 0; index < basket.products.length; index++) {
    //
    const foundProduct = products.find(
      (product) => product._id === basket.products[index].id
    );
    //

    // Add line 0, 1, 2 , 3 ....
    createNode("tbody", "tr", {className : "tbody" + index});
    //

    // Add the name of the product
    createNode(".tbody" + index, "td",  {className :"tdProduct" + basket.products[index].id, innerText: basket.products[index].name});
    //

    // Add quantity of product
    createNode(".tbody" + index, "td",{className : "tdQuantite" + basket.products[index].id, innerText : basket.products[index].quantity});
    //

    // Add unitary price
    createNode(".tbody" + index, "td", {className : "tdPrice" + basket.products[index].id, innerText : PriceFormat(foundProduct.price)});
    //

    // Calculate total
    totalPrice += foundProduct.price * basket.products[index].quantity;
  }
  // Show total
  createNode(".total", "th", {innerText : PriceFormat(totalPrice)});

  // Show clear button
  createNode(".total", "th", { id : "clear", className : "btn btn-outline-secondary", innerText : "x"});
}

////////////////////////////////////////////// Fonctions sendOrder //////////////////////////////////////////////

function sendOrderToServerByClickOnButton() {
  let formulaire = document.querySelector("#formulaire");

  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    let orderJsoned = JSON.stringify(order);
    try {
    console.log("bouton cliqué");
    postOrder(orderJsoned);
    console.log("function postorder");
    } catch (error) {
        console.error(error);
        throw new error("Erreur lors de l'envoi de l'order");
    }
  });
}
// Set informations from user input to order.contact
function setEventForField(fieldName) {
  locationOfField = "#" + fieldName;
  let element = document.querySelector(locationOfField);
  element.addEventListener("input", function (e) {
    order.contact[fieldName] = e.target.value;
    console.log(order);
    
  });
}

// Set products in order.products
function setProductsToOrder() {
  let products = [];
  if (checkLocalStorageKey("basket")) {
    let productsInLocalStorage = getLocalstorageKey("basket");
    for (let product in productsInLocalStorage.products) {
      let quantity = productsInLocalStorage.products[product].quantity;
      for (let i = 0; i < quantity; i++) {
        products.push(productsInLocalStorage.products[product].id);
      }
    }
    console.log(products);
  }
  order.products = products;
}


