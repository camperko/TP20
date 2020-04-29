/*
  Controller for exchange rates - access point for client
  getExchangeRate - get exchange rate of 2 currencies
*/

const express = require('express');
const router = express.Router();
const exchangeRateService = require('./exchange-rate.service');
const cryptoapis = require('../cryptoapis');

/*
  routes for exchange rate methods
*/
router.get('/:from/:to', getExchangeRate);

module.exports = router;

/*
  getExchangeRate - return exchange rate
  url - /:from/:to
*/
function getExchangeRate(req, res, next) {
  (async () => {
    try {
      var data = await cryptoapis.getSpecRate(req.params.from, req.params.to);
      if (data === undefined || data === null || data.payload === null || data.payload === undefined) {
        res.status(400).json({exchangeRate: null}); 
      } else {
         res.status(200).json({exchangeRate: data.payload.weightedAveragePrice});
      }
    } catch (error) {
      res.status(400).json({exchangeRate: null});
    }
  }) ();
}
