// Post Order
function postOrder(body) {
  return apiPost("teddies/order", body)
    .then((response) => {
      console.log("Réponse chargée, boucle de calcul en cours");
      let totalPaid = 0;
      for (let product = 0; product < response.products.length; product++) {
        // Calculate total paid in the answer
        totalPaid += response.products[product].price;
      }
      // Clear of the basket
      localStorage.removeItem("basket");
      // Redirection with the order id and total paid in parameters
      document.location.href =
        "confirmation.html?OrderId=" +
        response.orderId +
        "&" +
        "totalPaid=" +
        totalPaid;
    })
    .catch((error) => {
      return error;
    });
}
