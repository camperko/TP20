/*
  Controller for transactions - access point for client
  getTypes - get all transaction types from database
  getFields - get all fields for selected transaction type
*/

const express = require('express');
const router = express.Router();
const transactionService = require('./transaction.service');

router.get('/types', getTypes);
router.get('/fields/:type_name', getFields);

module.exports = router;

function getTypes(req, res, next) {
  transactionService.getTypes()
      .then(types => res.json(types))
      .catch(err => next(err));
}

function getFields(req, res, next) {
  transactionService.getFields(req.params.type_name)
      .then(fields => res.json(fields))
      .catch(err => next(err));
}
