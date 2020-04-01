
const express = require('express');
const router = express.Router();
const sellerService = require('./seller.service');

router.get('/:merchant_id/wallets', getSellerWallets);
router.post('/:merchant_id/wallet/create', createWallet);
router.delete('/wallet/delete/:wallet_id', deleteWallet);
router.put('/wallet/update/:wallet_id', updateWallet);
router.put('/:merchant_id/wallet/update/primary', setPrimaryWallet);
router.put('/wallet/unset_primary', unsetPrimary);

module.exports = router;

function getSellerWallets(req, res, next) {
    sellerService.getSellerWallets(req.params.merchant_id)
        .then(walletsRet => {
            if(walletsRet === 'failed' || walletsRet.length === 0) {
                res.json({wallets: 'failed'});
            } else {
                res.json({wallets: walletsRet});
            }
        }).catch(err => next(err));
}

function deleteWallet(req, res, next) {
    sellerService.deleteWallet(req.params.wallet_id)
        .then(db_response => {
            db_response === 'failed' ? res.json({delete: 'failed'}) : res.json({delete: 'success'});
        }).catch(err => next(err));
}

function createWallet(req, res, next) {
    sellerService.createWallet(req.params.merchant_id, req.body.wallet_address, req.body.trans_type_id)
        .then(db_response => {
            db_response === 'failed' ? res.json({wallet: 'failed'}) : res.json({wallet: db_response});
        }).catch(err => next(err));
}

function updateWallet(req, res, next) {
    sellerService.updateWallet(req.params.wallet_id, req.body.wallet_address, req.body.trans_type_id)
        .then(db_response => {
            db_response === 'failed' ? res.json({update: 'failed'}) : res.json({update: 'success'});
        }).catch(err => next(err));
}

function setPrimaryWallet(req, res, next) {
    sellerService.setPrimaryWallet(req.params.merchant_id, req.body.wallet_id)
        .then(db_response => {
            db_response === 'failed' ? res.json({updatePrimary: 'failed'}) : res.json({updatePrimary: 'success'});
        }).catch(err => next(err));
}

function unsetPrimary(req, res, next) {
    sellerService.unsetPrimary(req.body.wallet_id)
        .then(db_response => {
            db_response === 'failed' ? res.json({unsetPrimary: 'failed'}) : res.json({unsetPrimary: 'success'});
        }).catch(err => next(err));
}
