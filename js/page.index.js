

////////////////////////////////////////////// Execution of the script //////////////////////////////////////////////

fetchProducts("teddies").then(function (products) {
  console.log("Écriture des nodes du DOM");
  showProducts(products);
  if (config.badgesEnabled) {
    showBadges();
    console.log("Écriture des badges");
  }
});

////////////////////////////////////////////// Fonctions //////////////////////////////////////////////

// fonctions of showProducts are in domElements.js
function showProducts(products) {
  createNode("main", "section", {className : "row mx-auto justify-content-between"});
  for (
    let productIndex = 0;
    productIndex < products.length;
    productIndex++
  ) {
    createNode("section", "div", {className :"card col-12 teddy" + productIndex});
    createNode(".teddy" + productIndex, "img", {className : "image card-img-top img-fluid", src : products[productIndex].imageUrl});
    createNode(".teddy" + productIndex, "div", {className : "card-body" + productIndex});
    createNode(".card-body" + productIndex, "h5", {className : "card-title", innerText : products[productIndex].name});
    createNode(".card-body" + productIndex, "p", {className : "card-text", innerText : products[productIndex].description});
    createNode(".card-body" + productIndex, "p", { className :"card-text", innerText : PriceFormat(products[productIndex].price)});
    createNode(".card-body" + productIndex, "a", {className : "btn btn-primary", href : "./product.html?ProductId=" + products[productIndex]._id, innerText : "Détail"});
  }
}

