angular.module('transactions').controller('TransactionsController',['$scope','$routeParams','$location','Authentication','Transaction',function($scope,$routeParams,$location,Authentication,Transaction){
	
	$scope.authentication = Authentication;
	$scope.create = function(){
		var transaction = new Transaction({
			content: this.content,
			title: this.title,
			deposit: this.deposit
		});

		transaction.$save(function(response){
			console.log('transactions/'+ response._id);
			$location.path('transactions/'+ response._id);
		},function(errorResponse){
			$scope.error = errorResponse.data.message;	
		});
		};
	$scope.find = function(){debugger
		$scope.transactions = Transaction.query();
	};

	$scope.findOne = function(){debugger 
		$scope.transaction = Transaction.get({
			transactionId: $routeParams.transactionId
		});
	};

	$scope.update = function() {
		$scope.transaction.$update(function() {
			$location.path('transactions/' + $scope.transaction._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.delete = function(transaction) {
        	debugger
            if (transaction) {
                transaction.$remove(function() {
                    for (var i in $scope.transactions) {
                        if ($scope.transactions[i] === transaction) {
                            $scope.transactions.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.transaction.$remove(function() {debugger
                    $location.path('transactions/');
                });
            }
        };
	
}])