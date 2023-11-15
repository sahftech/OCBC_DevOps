function register() {
  var response = "";
  var jsonData = new Object();
  jsonData.name = document.getElementById("name").value;
  jsonData.nric = document.getElementById("nric").value;
  jsonData.email = document.getElementById("email").value;
  jsonData.access = document.getElementById("access").value;
  jsonData.pin = document.getElementById("pin").value;
  jsonData.type = document.getElementById("type").value;
  jsonData.contact = document.getElementById("contact").value;

  if (
    jsonData.name == "" ||
    jsonData.nric == "" ||
    jsonData.email == "" ||
    jsonData.access == "" ||
    jsonData.pin == "" ||
    jsonData.type == "" ||
    jsonData.contact == ""
  ) {
    document.getElementById("error").innerHTML = "All fields are required!";
    return;
  } else if (jsonData.access == jsonData.name) {
    document.getElementById("error").innerHTML =
      "Do not use Name for access code!";
    return;
  }

  var request = new XMLHttpRequest();
  request.open("POST", "/register", true);
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = function () {
    response = JSON.parse(request.responseText);

    console.log(response);
    if (response.message == undefined) {
      window.location.href = "index.html";
    } else {
      document.getElementById("error").innerHTML = "Authentication failed!";
    }
  };
  request.send(JSON.stringify(jsonData));
}
