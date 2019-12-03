const config = require('../config.json');
const jwt = require('jsonwebtoken');
var db_conf = require("../database_conf");

// users hardcoded for simplicity, store in a db for production applications
//const users = [{ id: 1, username: 'test', password: 'test' }];

module.exports = {
    authenticate,
    getAll
};


async function authenticate({ username, password }) {
    try{
        let data = await db_conf.db.one('SELECT * FROM user_account WHERE username = $1 AND userpassword = $2', [username, password]);
        if(Object.keys(data).length){
            const user = { id: data.user_account_id, username: data.username, password: data.userpassword}
            if (user) {
                const token = jwt.sign({ sub: user.id }, config.secret);
                const { password, ...userWithoutPassword } = user;
                return {
                    ...userWithoutPassword,
                    token
                };
            }
        } else {
          return false;
        }
      }catch(error) {
          console.log(error);
      }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}