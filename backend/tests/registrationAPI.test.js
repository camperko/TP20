const request = require('supertest')
const server = require('../server')
const db_conf = require('../database_conf');

//delete user from database
async function deleteUser(username, db) {
  console.log("Spustam mazanie");
  try {
    let data = await db.any('SELECT user_account_id FROM user_account WHERE username = $1', [username]);
    //console.log(data);
    if (Object.keys(data).length) {
      db.any('DELETE FROM user_account WHERE username = $1', [username]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

describe('registration test', () => {

  afterAll(() => {
    return deleteUser("testuser", db_conf.db_test);
  });

  afterAll(function(done) {
    server.close(done);
  });

  //console.log(typeof db);
  it('should create a new user', async () => {
    console.log("server2: " + server);
    const res = await request(server)
      .post('/api/registration')
      .send({
        username: "testuser",
        password: "testpassword",
        dbS: "test",      })
    expect(res.statusCode).toEqual(200)
    expect(res.text).toBe('{\"value\":\"success\"}')
  })

})
