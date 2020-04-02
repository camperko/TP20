/*
  Component for transaction - DB access
  getTypes - get all transaction types
  getFields - get all fields of selected transaction type
  getSellerWallet - get seller wallet by seller name and transaction type
  logTransaction - insert transaction details into database
*/
var db_conf = require("../database_conf");

module.exports = {
  getTypes,
  getFields,
  getSellerWallet,
  logTransaction
};

/*
  getTypes - get all transaction types from database
  FROM - transaction_type
  return any => array({type_name, type_display})
*/
async function getTypes() {
  try {
    return await db_conf.db.any("SELECT trans_type_id, type_name, type_display FROM transaction_type;");
  } catch (error) {
    console.log(error);
  }
}

/*
  getFields - get all fields for selected transaction type name from database
  params
    - transactionTypeName - transaction type name for selected transaction type
  FROM - transaction_type_field
  return any => array({field_name, field_display})
*/
async function getFields(transactionTypeName) {
  try {
    return await db_conf.db.any(`SELECT ttf.field_name, ttf.field_display FROM transaction_type_field ttf
                                  JOIN transaction_type tp ON (tp.trans_type_id = ttf.trans_type_fk)
                                  WHERE tp.type_name = $1 ORDER BY ttf.field_order ASC;`,
                                   [transactionTypeName] );
  } catch (error) {
    console.log(error);
  }
}

/*
  TODO: implement user selection
  getSellerWallet - get seller wallet address for selected transaction type name and selected user from database
  params
    - transactionTypeName - transaction type name for selected transaction type
  FROM - user_transaction
  return any => array({wallet_address})
*/
async function getSellerWallet(transactionTypeName, merchant_id) {
  try {
    return db_conf.db.any(`SELECT ut.wallet_address FROM user_transaction ut
      JOIN user_account ua ON (ua.user_account_id = ut.user_account_fk)
      JOIN transaction_type tt ON (tt.trans_type_id = ut.trans_type_fk)
      WHERE ua.user_account_id = $1
      AND tt.type_name = $2`,
      [merchant_id, transactionTypeName]);
  } catch (error) {
    return 'failed';
  }
}

/*
  logTransaction - insert transaction details into database
  params
    - transactionTypeName - transaction type name for selected transaction type
    - sender_trans_type_name - the name of currency that customer used for payment
    - receiver_trans_type_name - the name of currency that seller received
    - sender_price - the amount of currency that customer paid
    - receiver_price - the amount of currency that seller received
    - is_successful - transaction status; true = successful, false = unsuccessful
    - hash - transaction hash
    - user_account_id_fk - seller ID
    - order_id - seller order number
  INTO - transaction_log
  return any
*/
async function logTransaction(sender_trans_type_name, receiver_trans_type_name, sender_price, receiver_price, is_successful, hash, user_account_id_fk, order_id) {
  try {
    return db_conf.db.any(`INSERT INTO transaction_log
    (
      sender_trans_type_fk, 
      receiver_trans_type_fk,
      sender_price,
      receiver_price,
      is_successful,
      hash,
      user_account_id_fk,
      timestamp,
      order_id
    )
    VALUES
    (
      (SELECT trans_type_id FROM transaction_type WHERE type_name = $1), 
      (SELECT trans_type_id FROM transaction_type WHERE type_name = $2), 
      $3, 
      $4, 
      $5, 
      $6, 
      $7, 
      now()::timestamp,
      $8
    )`,
    [sender_trans_type_name, receiver_trans_type_name, sender_price, receiver_price, is_successful, hash, user_account_id_fk, order_id]);
  } catch (error) {
    return 'failed';
  }
}