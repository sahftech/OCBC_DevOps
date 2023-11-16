function loadBalance() {
    var response = '';
    var request = new XMLHttpRequest();

    request.open('GET', '/balance/' + sessionStorage.getItem("access"), true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
        transactions = response.transactions;

        document.getElementById('accountName').innerText = response.name;
        document.getElementById('accountEmail').innerText = response.email;

        // document.getElementById('accountID').innerHTML = "<h5>" + response.type +"<h5>";
        // document.getElementById('accountID').innerHTML += "<h5>" + response.id +"<h5>";

        document.getElementById('accountBalance').innerText = "$" + response.balance;
        
        var html = ''
        for (var i = transactions.length-1; i > 0; i--)
        {
            var cssClass = ""
            var amountSign = ""
            if (transactions[i].type == "W") {
                cssClass = " class = 'withdrawal'";
                amountSign = "-";
            }
            

            // <div class="transfer">
            //     <dl class="transfer-details">
            //       <div>
            //         <dt>Warner Bros.</dt>
            //       </div>
            //       <div>
            //         <dt>Description Description DescriptionDescription ptionDescription</dt>
            //       </div>
            //       <div>
            //         <dt>22 Oct. 21</dt>
            //         <dd>11.23.4</dd>
            //       </div>
            //     </dl>
            //     <div class="transfer-number">
            //       - $ 70
            //     </div>
            //   </div>
            var html = "<div class='transfer'" + ">" +
                        "<dl class='transfer-details'>" +
                        "<div>" +
                        "<dt id='transaction-amount'>" + amountSign + transactions[i].amount + "</dt>" +
                        "</div>" +
                        "<div>" +
                        "<dt>" + transactions[i].desc + "</dt>" +
                        "</div>" +
                        "<div>" +
                        "<dt>" + transactions[i].datetime.slice(0, 10) + "</dt>" +
                        "<dd>" + transactions[i].datetime.slice(11) + "</dd>" +
                        "</div>" +
                        "</dl>" +
                        "<div />";
            

            var box = document.createElement("div");
            box.classList.add("transfer");
            box.innerHTML = html;
            document.getElementsByClassName("transfer-box")[0].appendChild(box);   
            
            
        }
    };

    request.send();
}

function isFloat(str) {
    return /^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(str);
  }

function transferFunds() {
	var response = "";

	var jsonData = new Object();
	jsonData.receiver = document.getElementById("recipient").value;
	jsonData.amount = document.getElementById("amount").value;
	jsonData.desc = document.getElementById("desc").value;
	jsonData.sender = sessionStorage.getItem("email");

    if (jsonData.receiver == "" || jsonData.amount == "" || jsonData.desc == "") {
		document.getElementById("message").innerHTML = 'All fields are required!';
		document.getElementById("message").setAttribute("class", "text-danger");
		return;
	}

    if (!isFloat(jsonData.amount)) {
		document.getElementById("message").innerHTML = 'Amount must be numeric!';
		document.getElementById("message").setAttribute("class", "text-danger");
		return;
	}

    if (jsonData.receiver == jsonData.sender) {
		document.getElementById("message").innerHTML = 'Receiver and sender cannot be the same person!';
		document.getElementById("message").setAttribute("class", "text-danger");
		return;
	}

	var request = new XMLHttpRequest();

	request.open("POST", "/transfer", true);
	request.setRequestHeader('Content-Type', 'application/json');

	request.onload = function () {
		response = JSON.parse(request.responseText);

        if (response.message == "Transfer successful!") {
			document.getElementById("message").innerHTML = 'Transfer successful!';
			document.getElementById("message").setAttribute("class", "text-success");

			window.location.href = 'home.html';
		}
		else {
			document.getElementById("message").innerHTML = 'Unable to transfer funds!';			
			document.getElementById("message").setAttribute("class", "text-danger");
		}
	};

	request.send(JSON.stringify(jsonData));
}

