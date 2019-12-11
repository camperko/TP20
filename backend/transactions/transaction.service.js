var db_conf = require("../database_conf");

module.exports = {
  getTypes,
  getFields
};

async function getTypes() {
  try {
    return await db_conf.db.any("SELECT type_name, type_display FROM transaction_type;");
  } catch (error) {
    console.log(error);
  }
}

async function getFields(transactionTypeName) {
  console.log(transactionTypeName);
  try {
    return await db_conf.db.any(`SELECT ttf.field_name, ttf.field_display FROM transaction_type_field ttf
                                  JOIN transaction_type tp ON (tp.trans_type_id = ttf.trans_type_fk)
                                  WHERE tp.type_name = $1 ORDER BY ttf.field_order ASC;`,
                                   [transactionTypeName] );
  } catch (error) {
    console.log(error);
  }
}

// TODO!
// async function sendTransaction() {

// }
