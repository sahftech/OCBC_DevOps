function deposit() {
  var response = "";
  
  var jsonData = new Object();
  jsonData.access = sessionStorage.getItem("access");
  jsonData.amount = document.getElementById("deposit-amount").value;
  jsonData.desc = document.getElementById("deposit-desciption").value;
  
  var request = new XMLHttpRequest();
  
  request.open("POST", "/deposit", true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onload = function() {
    response = JSON.parse(request.responseText);

    if (response.message == "Deposit successful!") {
      window.location.href = 'home.html';
    }
    else {
      document.getElementById("error").innerHTML = 'Invalid credentials!';
    }
  };
  
  request.send(JSON.stringify(jsonData));

}

function withdraw() {
  var response = "";
  
  var jsonData = new Object();
  jsonData.access = sessionStorage.getItem("access");
  jsonData.amount = document.getElementById("withdraw-amount").value;
  jsonData.desc = document.getElementById("withdraw-desciption").value;
  
  var request = new XMLHttpRequest();
  
  request.open("POST", "/withdraw", true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onload = function() {
    response = JSON.parse(request.responseText);

    if (response.message == "Withdrawal successful!") {
      window.location.href = 'home.html';
    }
    else {
      document.getElementById("error").innerHTML = 'Invalid credentials!';
    }
  };
  
  request.send(JSON.stringify(jsonData));
}