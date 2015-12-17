angular.module('transactions').config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/transactions', {
            templateUrl: 'transactions/views/list-transactions.client.view.html'
        }).when('/transactions/create', {
            templateUrl: 'transactions/views/create-transaction.client.view.html'
        }).when('/transactions/:transactionId', {
            templateUrl: 'transactions/views/view-transaction.client.view.html'
        }).when('/transactions/:transactionId/edit', {
            templateUrl: 'transactions/views/edit-transaction.client.view.html'
        });
    }
    ]);