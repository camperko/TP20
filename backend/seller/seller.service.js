var db_conf = require("../database_conf");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    getSellerWallets,
    createWallet,
    deleteWallet,
    updateWallet,
    setPrimaryWallet,
    unsetPrimary,
    changeEmail,
    changePassword,
    getEmail,
    checkPassword
};

async function getSellerWallets(merchant_id) {
    try {
        return db_conf.db.any(`SELECT ut.user_trans_id, ut.wallet_address, ut.is_primary, tt.type_name, tt.type_display FROM user_transaction ut
            JOIN user_account ua ON (ua.user_account_id = ut.user_account_fk)
            JOIN transaction_type tt ON (tt.trans_type_id = ut.trans_type_fk)
            WHERE ua.user_account_id = $1`,
            [merchant_id]);
    } catch (error) {
        return 'failed';
    }
}

async function deleteWallet(user_trans_id) {
    try {
        return db_conf.db.result(`DELETE FROM user_transaction
            WHERE user_trans_id = $1`,
            [user_trans_id]);
    } catch (error) {
        return 'failed';
    }
}

async function createWallet(merchant_id, wallet_address, trans_type_id, db) {
    try {
        const database = db === 'primary' ? db_conf.db : db_conf.db_test;
        return database.one(`INSERT INTO user_transaction(user_account_fk, trans_type_fk, wallet_address, is_primary)
            VALUES($1, $2, $3, $4) RETURNING user_trans_id`,
            [merchant_id, trans_type_id, wallet_address, false]);
    } catch (error) {
        return 'failed';
    }
}

async function updateWallet(user_trans_id, wallet_address, trans_type_id) {
    try {
        return db_conf.db.result(`UPDATE user_transaction
            SET wallet_address = $1, trans_type_fk = $2
            WHERE user_trans_id = $3`,
            [wallet_address, trans_type_id, user_trans_id]);
    } catch (error) {
        return 'failed';
    }
}

async function setPrimaryWallet(merchant_id, user_trans_id) {
    try {
        await db_conf.db.none(`UPDATE user_transaction
            SET is_primary = false
            WHERE user_account_fk = $1`,
            [merchant_id]);
        return db_conf.db.result(`UPDATE user_transaction
            SET is_primary = true
            WHERE user_trans_id = $1`,
            [user_trans_id]);
    } catch (error) {
        return 'failed';
    }
}

async function unsetPrimary(user_trans_id) {
    try {
        return db_conf.db.result(`UPDATE user_transaction
            SET is_primary = false
            WHERE user_trans_id = $1`,
            [user_trans_id]);
    } catch (error) {
        return 'failed';
    }
}

async function changeEmail(merchant_id, email) {
    try {
        return db_conf.db.result(`UPDATE user_account
            SET email = $1
            WHERE user_account_id = $2`,
            [email, merchant_id]);
    } catch (error) {
        return 'failed';
    }
}

async function changePassword(merchant_id, userpassword) {
    try {
        bcrypt.hash(userpassword, saltRounds)
            .then(hash => {
                return db_conf.db.result(`UPDATE user_account
                    SET userpassword = $1
                    WHERE user_account_id = $2`,
                    [hash, merchant_id]);
            });
    } catch (error) {
        return 'failed';
    }
}

async function getEmail(merchant_id) {
    try {
        return db_conf.db.one(`SELECT email FROM user_account
            WHERE user_account_id = $1`,
            [merchant_id]);
    } catch (error) {
        return 'failed';
    }
}

async function checkPassword(merchant_id, userpassword) {
    try {
        const stored_password = await db_conf.db.one(`SELECT userpassword FROM user_account WHERE user_account_id = $1`, [merchant_id]);
        if (stored_password !== undefined) {
            return await bcrypt.compare(userpassword, stored_password.userpassword);
        }
    } catch (error) {
        return 'failed';
    }
}
