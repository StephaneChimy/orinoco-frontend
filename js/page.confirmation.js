////////////////////////////////////////////// Variables //////////////////////////////////////////////

let parsedUrl = new URL(window.location.href);
////////////////////////////////////////////// Execution of the script //////////////////////////////////////////////

showConfirmation();
if (config.badgesEnabled) {
  showBadges();
  console.log("Écriture des badges");
}

////////////////////////////////////////////// Fonctions //////////////////////////////////////////////

function getOrderId() {
  return parsedUrl.searchParams.get("OrderId");
}
function getTotalPaid() {
  return parsedUrl.searchParams.get("totalPaid");
}

function showConfirmation() {
  if ((getOrderId() != null) && getTotalPaid() != 0){
    createNode("main", "section", {className : "justify-content-around text-center"});
    createNode("section", "h1", {innerText : "L'équipe d'Orinoco vous remercie!"});
    createNode("section", "p", {innerText : "Le montant de votre achat est de: " + PriceFormat(getTotalPaid())});
    createNode("section", "p", {innerText : "Votre numéros de commande est le: " + getOrderId()});
  }else{
    showErrorConnection("Vous n'avez pas commandé, merci de revenir sur la page principale");
  }
  
}

