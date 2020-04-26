const request = require('supertest')
const server = require('../server')
const db_conf = require('../database_conf');


//delete transaction from database
async function deleteTransaction(orderId, db) {
  console.log("Spustam mazanie");
  try {
    let data = await db.any('SELECT order_id FROM transaction_log WHERE order_id = $1', [orderId]);
    //console.log(data);
    if (Object.keys(data).length) {
      db.any('DELETE FROM transaction_log WHERE order_id = $1', [orderId]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

describe('transaction test', () => {

    afterAll(function(done) {
      server.close(done);
    });

    beforeEach(() => {
      return deleteTransaction(1234, db_conf.db_test);
   });
  
    it('should make succesfull transaction and store it to database', async () => {
        delete require.cache[require.resolve('../server')];
        const res = await request(server)
            .post('/transaction/send/' + 'BTC')
            .send({
              output_wallet: 'miaRyqZqPAUTyoPrrd9zXdr8CXhpgjL71J',
              price: 1000,
              fees: 500,
              fee_wallet: 1,
              input_wallets: [[{"field_name":"address","field_display":"BTC - Address","value":"mt39sKy96aeg8XyVc4K1LyxVcXquuutWDX"},{"field_name":"wif","field_display":"BTC - WIF","value":"cPx7EE2JoK9HDyUtyh52BdSgMfcjGAr5ZA45jdHykfWLnbEe63e1"}]],
              wallets_inputs: [1000],
              merchantId: 1,
              orderId: 1234,
              dbS: "test"
            })
            expect(res.statusCode).toEqual(200)
            expect(res.text).toEqual(expect.stringContaining('{\"message\":\"Sending payment to blockchain successful. TxID: '))
        });
   });