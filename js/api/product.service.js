// Fetch a product by its ID
function fetchProduct(id, productType) {
  // path = productType + "/" + id
  return apiGet(productType + "/" + id); // path
}

// Fetch a list of products
function fetchProducts(productType) {
  return apiGet(productType);
}
