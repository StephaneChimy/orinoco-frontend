const request = new XMLHttpRequest();

// Will perform a GET request to the API
function apiGet(path) {
  return new Promise((resolve, reject) => {
    request.open("GET", config.apiBaseUrl + "/" + path);
    request.onload = function () {
      if (request.readyState == 4 && request.status == 200) {
        response = JSON.parse(request.response);
        console.log("Récupération de la réponse");
        console.log(response);
        resolve(response);
      } else {
        reject(console.log("Problème execution fonction apiGet."));
      }
    };
    request.send();
    request.onerror = function () {
        showErrorConnection("Erreur de connection, merci de revenir plus tard.");
      console.log(
        "Status de la requête: " +
          request.status +
          " | " +
          "ReadyState de la requête: " +
          request.readyState
      );
    };
  });
}

// Will perform a POST request to the API
function apiPost(path, body) {
  return new Promise((resolve, reject) => {
    request.open("POST", config.apiBaseUrl + "/" + path, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      if (request.readyState == 4 && request.status == 201) {
        response = JSON.parse(request.response);
        console.log("Récupération de la réponse");
        console.log(response);
        resolve(response);
      } else {
        reject(console.log("Problème execution fonction apiPost."));
      }
    };
    request.send(body);
    request.onerror = function () {
        showErrorConnection("Erreur de connection, merci de revenir plus tard.");
      console.log(
        "Status de la requête: " +
          request.status +
          " | " +
          "ReadyState de la requête: " +
          request.readyState
      );
    };
  });
}
