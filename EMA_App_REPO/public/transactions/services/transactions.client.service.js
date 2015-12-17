angular.module('transactions').factory('Transaction',['$resource',function($resource){
	debugger
	return $resource('api/transactions/:transactionId',{
		transactionId: '@_id'
	},{
		update:{
			method: 'PUT'
		}
	});
}]);