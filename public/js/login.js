function login() {
	var response = "";
	
	var jsonData = new Object();
	jsonData.access = document.getElementById("access").value;
	jsonData.pin = document.getElementById("pin").value;
	
	if (jsonData.access == "" || jsonData.pin == "") {
		document.getElementById("error").innerHTML = 'All fields are required!';
		return;
	} 

	var request = new XMLHttpRequest();
	
	request.open("POST", "/login", true);
	request.setRequestHeader('Content-Type', 'application/json');

	request.onload = function() {
		response = JSON.parse(request.responseText);

		if (response.message == "Login successful!") {
			sessionStorage.setItem("access", jsonData.access)
            window.location.href = 'home.html';
		}
		else {
			document.getElementById("error").innerHTML = 'Invalid credentials!';
		}
	};
	
	request.send(JSON.stringify(jsonData));
}