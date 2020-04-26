const config = require('../config.json');
const jwt = require('jsonwebtoken');
var db_conf = require("../database_conf");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// users hardcoded for simplicity, store in a db for production applications

module.exports = {
    authenticate,
    getAll,
    registration
};


async function authenticate({ username, password, dbS}){
  var db;
  if(dbS == "test"){
    db = db_conf.db_test;
  } else {
    db = db_conf.db;
  }

    try{
        let userData = await db.one('SELECT * FROM user_account WHERE username = $1', [username]);
        //console.log(userData);
        if(Object.keys(userData).length){
            const match = await bcrypt.compare(password, userData.userpassword);
            if(match){
                const user = {id : userData.user_account_id, username: userData.username, password: password}
                if(user){
                    const token = jwt.sign({ sub: user.id}, config.secret);
                    //console.log(token);
                    const { password, ...userWithoutPassword } = user;
                    return {
                            ...userWithoutPassword,
                            token
                    };
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

// do a single select to the database with specific username
// return true if found, else return false
async function findUser(username, db) {
    try {
      let data = await db.any('SELECT user_account_id FROM user_account WHERE username = $1', [username]);
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
function addUser(username, email, pwHash, db) {
    db.any('INSERT INTO user_account(username, userpassword, account_type_fk, is_active, create_date, email)' +
        'VALUES($1, $2, $3, $4, $5, $6)', [username, pwHash, 2, true, new Date(), email])
      .then(() => {
        console.log("User successfully added!");
      })
      .catch(error => {
        console.log("Fail! Adding unsuccessfull!");
      });
  }

async function registration({username, email, password, dbS}){
    console.log('Request of registration accepted!');
    var database;

    //console.log(dbS);

    if(dbS == "test"){
      database = db_conf.db_test;
    } else {
      database = db_conf.db;
    }
    if (await findUser(username, database)) {
        console.log("User already exists!");
        return false;
      } else {
        bcrypt
          .hash(password, saltRounds).then(hash => {
            addUser(username, email, hash, database);
          })
          .catch(err => {console.log(err); return false});
  
        // console.log("User added!");
        return true;
      }
}
