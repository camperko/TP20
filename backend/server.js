const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var db_conf = require("./database_conf");

var corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));


app.listen(8080, () => {
  console.log('Server started!');

  // select all from table
  db_conf.db.any('SELECT * FROM transaction_type')
    .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
    });

  // insert into db example
  //db.none('INSERT INTO users(first_name, last_name, age) VALUES(${name.first}, $<name.last>, $/age/)', {
  //  name: {first: 'John', last: 'Dow'},
  //  age: 30
  //});
});

// do a single select to the database with specific username
// return true if found, else return false
async function findUser(username){
    try{
      let data = await db_conf.db.any('SELECT user_account_id FROM user_account WHERE username = $1', [username]);
      //console.log(data);
      if(Object.keys(data).length){
        return true;
      } else {
        return false;
      }
    }catch(error) {
        console.log(error);
    }
}

//create a new user in database
function addUser(username, password){
  db_conf.db.any('INSERT INTO user_account(username, userpassword, is_active, create_date)'
          + 'VALUES($1, $2, $3, $4)', [username, password, true, new Date()])
          .then(() => {
            console.log("User successfully added!");
        })
        .catch(error => {
            console.log("Fail! Adding unsuccessfull!");
        });
}

app.route('/api/test').get((req, res) => {
  console.log('Request accepted!');
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify({
    testMessages: 'fine'
  }));
});

app.route('/api/test').post((req, res) => {
  console.log(req.body);
});

//method to receive data from client
app.route('/api/registration').post((req, res) => {
  console.log('Request of registration accepted!');
  var username = req.body.username;
  var password = req.body.password;
  
  (async() => {
    // chceck whether is specific user already in database
    // if he is, return fail for new user registration
    // if he is not, add new user to database and return success
    if(await findUser(username)){
      console.log("User already exists!");
      res.send(JSON.stringify({ 
        value: 'fail'
      }));
    } else {
      addUser(username, password);
      // console.log("User added!");
      res.send(JSON.stringify({ 
        value: 'success'
      }));
    }
  })();
});