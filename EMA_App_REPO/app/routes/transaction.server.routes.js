var users = require('../../app/controllers/users.server.controller'),
    transactions = require('../../app/controllers/transaction.server.controller'),
    balance = require('../../app/controllers/transaction-balance.server.controller');
        module.exports = function(app) {
            app.route('/api/transactions')
                .get(transactions.list)
                .post(users.requiresLogin, transactions.create);
            app.route('/api/balance')
                .get(balance.read)
                .post(users.requiresLogin, balance.create);
            app.route('/api/transactions/:transactionId')
                .get(transactions.read)
                .put(users.requiresLogin, transactions.hasAuthorization, transactions.update)
               .delete(users.requiresLogin, transactions.hasAuthorization, transactions.delete);
            app.param('transactionId', transactions.transactionByID);
        };