//require('rootpath')();
const express = require('express');
var morgan = require('morgan');
var uuid = require('node-uuid');
var fs = require('fs');
var path = require('path');
const util = require('util');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const request = require("request");

app.use(cors());
// MORGAN LOGGER SETUP
// set directory and name of .log file
var accessLogStream = fs.createWriteStream(path.join('./logs', 'access.log'), {
  flags: 'a'
});
// function to generate unique request id
app.use(function requestId(req, res, next) {
  req.id = uuid.v4();
  next();
})
// setup morgan requestID token
morgan.token('requestID', function (req) {
  return req.id;
})
// setup morgan reqHeaders token
morgan.token('reqHeaders', function (req, res) {
  return JSON.stringify(req.headers);
});
// define log format
// :date[iso] = the current date and time in UTC
// :requestID = unique generated request ID
// :remote-addr = the remote address of the request
// :reqHeaders = request headers in JSON format
// :method = the HTTP method of the request
// :url = the URL of the request
// :status = the status code of the response
// :res[content-length] = the content lenght of response
// :response-time = the time between the request coming into morgan and when the response headers are written, in milliseconds
app.use(morgan(':date[iso] :requestID :remote-addr :reqHeaders :method :url :status :res[content-length] :response-time ms', {
  stream: accessLogStream
}));

// WINSTON LOGGER SETUP
const {
  createLogger,
  transports,
  format
} = require('winston');
const {
  combine,
  timestamp
} = format;
const logform = require('logform');
// define log format
const winstonConsoleFormat = logform.format.combine(
  logform.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);
const logger = createLogger({
  format: combine(
    timestamp(),
    winstonConsoleFormat
  ),
  transports: [],
  // set exception logging
  exceptionHandlers: [
    // set directory and name of .log file
    new transports.File({
      filename: path.join('./logs', '/exceptions.log'),
      timestamp: true
    })
  ],
  exitOnError: false // winston will handle uncaught exceptions
});

var db_conf = require("./database_conf");
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
var cryptoapis = require("./cryptoapis");

module.exports = {
  cryptoapis
}

var corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/transaction', require('./transactions/transaction.controller'));

// global error handler
app.use(errorHandler);

app.listen(8080, () => {
  console.log('Server started!');

  // try to throw errors to see if winston logger works
  /*fs.readFile('nonexistingfile.txt', function (err, data) {
    if (err) throw err;
    console.log(data);
  });*/
  //throw new Error('An error occurred'); 

  // cryptoapis.switchNetwork(cryptoapis.caClient.BC.BTC);
  // // cryptoapis.generateAddress();
  // // cryptoapis.generateAddress();

  // (async () => {
  //   try {
  //     var data = await cryptoapis.getAddressTransactions('mt39sKy96aeg8XyVc4K1LyxVcXquuutWDX');
  //     console.log(util.inspect(data, false, null, true));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }) ();

  //cryptoapis.createAccount();
  //cryptoapis.getSpecRate('5b1ea92e584bf50020130637', '5b1ea92e584bf50020130670');
  //cryptoapis.listAllAccounts();
  //cryptoapis.getAllRates('5b1ea92e584bf50020130616');
  //cryptoapis.saveAssets(200);

  //getTransactionTypeFields(1);
});

// do a single select to the database with specific username
// return true if found, else return false
async function findUser(username) {
  try {
    let data = await db_conf.db.any('SELECT user_account_id FROM user_account WHERE username = $1', [username]);
    //console.log(data);
    if (Object.keys(data).length) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//create a new user in database
function addUser(username, pwHash) {
  db_conf.db.any('INSERT INTO user_account(username, userpassword, is_active, create_date)' +
      'VALUES($1, $2, $3, $4)', [username, pwHash, true, new Date()])
    .then(() => {
      console.log("User successfully added!");
    })
    .catch(error => {
      console.log("Fail! Adding unsuccessfull!");
    });
}

//method to receive data from client
app.route('/api/registration').post((req, res) => {
  console.log('Request of registration accepted!');
  var username = req.body.username;
  var password = req.body.password;

  (async () => {
    // chceck whether is specific user already in database
    // if he is, return fail for new user registration
    // if he is not, add new user to database and return success
    if (await findUser(username)) {
      console.log("User already exists!");
      res.send(JSON.stringify({
        value: 'fail'
      }));
    } else {
      bcrypt
        .hash(password, saltRounds).then(hash => {
          addUser(username, hash);
        })
        .catch(err => console.log(err));

      // console.log("User added!");
      res.send(JSON.stringify({
        value: 'success'
      }));
    }
  })();
});

app.route('/api/getAssetDetails').get((req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify({
    data: cryptoapis.assetDetails
  }));
  console.log("asset details");
});

app.post('/api/token_validate', (req, res) => {

  let token = req.body.recaptcha;
  const secretKey = "6Lfm0t4UAAAAAD3E2NdgfHFCIYvbFuxNcXfzm2em"; //the secret key from your google admin console;

  //token validation url is URL: https://www.google.com/recaptcha/api/siteverify 
  // METHOD used is: POST
  
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`

  //note that remoteip is the users ip address and it is optional
  // in node req.connection.remoteAddress gives the users ip address

  if (token === null || token === undefined) {
    res.status(201).send({
      success: false,
      message: "Token is empty or invalid"
    })
    return console.log("token empty");
  }
  
  request(url, function (err, response, body) {
    //the body is the data that contains success message
    body = JSON.parse(body);
    //check if the validation failed
    //console.log(body.success);
    if (body.success !== undefined && !body.success) {
      res.send({
        success: false,
        'message': "recaptcha failed"
      });
      return console.log("failed")
    }
    //if passed response success message to client
    console.log("captcha succesfull");
    res.send({
      "success": true,
      'message': "recaptcha passed"
    });

  })
});