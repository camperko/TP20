const config = require('../config.json');
const jwt = require('jsonwebtoken');
var db_conf = require("../database_conf");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// users hardcoded for simplicity, store in a db for production applications
//const users = [{ id: 1, username: 'test', password: 'test' }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password}){
    try{
        let userData = await db_conf.db.one('SELECT * FROM user_account WHERE username = $1', [username]);
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