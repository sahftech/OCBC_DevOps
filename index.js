var express = require('express');
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);
})

app.listen(PORT, function () {
  console.log(`Demo project at: http://localhost:${PORT}`);
})

