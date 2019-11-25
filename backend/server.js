const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var db_conf = require("./database_conf");
var cryptoapis = require("./cryptoapis");

var corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200
}



app.use(bodyParser.json());
app.use(cors(corsOptions));


app.listen(8080, () => {
  console.log('Server started!');

  //cryptoapis.createAccount();
  //cryptoapis.getAssets(200);
  //cryptoapis.getSpecRate('5b1ea92e584bf50020130637', '5b1ea92e584bf50020130670');
  //cryptoapis.listAllAccounts();
  //cryptoapis.getAllRates('5b1ea92e584bf50020130616');

  // select all from table
  // db_conf.db.any('SELECT * FROM transaction_type')
  //   .then(function(data) {
  //       console.log(data);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //   });

  // insert into db example
  //db.none('INSERT INTO users(first_name, last_name, age) VALUES(${name.first}, $<name.last>, $/age/)', {
  //  name: {first: 'John', last: 'Dow'},
  //  age: 30
  //});
});

// app.route('/api/test').get((req, res) => {
//   console.log('Request accepted!');
//   res.setHeader('Content-type', 'application/json');
//   res.send(JSON.stringify({
//     testMessages: 'fine'
//   }));
// });

// app.route('/api/test').post((req, res) => {
//   console.log(req.body);
// });

