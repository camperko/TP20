const request = require('supertest');
const server = require('../server');
const db_conf = require('../database_conf');

//delete wallet from database
async function delete_wallet(wallet_address, db) {
    try {
        let data = await db.any('SELECT 1 FROM user_transaction WHERE wallet_address = $1', [wallet_address]);
        //console.log(data);
        if (Object.keys(data).length) {
            db.any('DELETE FROM user_transaction WHERE wallet_address = $1', [wallet_address]);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

describe('wallet creation test', () => {

    afterAll(function(done) {
        server.close(done);
    });

    beforeEach(() => {
        return delete_wallet("testForWalletsInUserTransaction", db_conf.db_test);
    });

    //console.log(typeof db);
    it('should create a new wallet', async () => {
        console.log("server2: " + server);
        delete require.cache[require.resolve('../server')];
        const res = await request(server)
            .post('/seller/1/wallet/create')
            .send({
                wallet_address: "testForWalletsInUserTransaction",
                trans_type_id: "1",
                dbs: true
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should be unsuccessful for new wallet creation', async () => {
        console.log("server2: " + server);
        delete require.cache[require.resolve('../server')];
        const res = await request(server)
            .post('/seller/1/wallet/create')
            .send({
                wallet_address: "testForWalletsInUserTransaction",
                trans_type_id: "1000000",
                dbs: true
            });
        expect(res.statusCode).toEqual(500);
    });
});
