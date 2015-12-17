var mongoose = require('mongoose');
Transaction = mongoose.model('Transaction');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
            message;
        }
    } else {
        return 'Unknown server error';
    }
};
exports.create = function(req,res){
    console.log('hit create');
	var transaction = new Transaction(req.body);
    console.log(req.body);
		transaction.creator = req.user;

		transaction.save(function(err){
			if(err){
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			}else{
				res.json(transaction);
			}
		});
};

exports.list = function(req, res) {
    Transaction.find().sort('-created').populate('creator', 'firstName lastName fullName ').exec(function(err, transactions) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(transactions);
        }
    });
};



exports.read = function(req, res) {console.log('read');
    res.json(req.transaction);
};

exports.update = function(req, res) {
    console.log(req)
    console.log(req.transaction.title)
    var transaction = req.transaction;
    transaction.title = req.body.title;

    transaction.content = req.body.content;
    transaction.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(transaction);
        }
    });
};

exports.delete = function(req, res) {
    var transaction = req.transaction;
    transaction.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(transaction);
        }
    });
};
exports.transactionByID = function(req, res, next, id) { 
    console.log('in transactionByID');
    Transaction.findById(id).populate('creator', 'firstName lastName fullName ').exec(function(err, transaction) {
console.log('---------------------------------------transaction:'+transaction);
        if (err) return next(err);
        if (!transaction) return next(new Error('Failed to load transaction ' + id)); 
        req.transaction = transaction; 
        next();
    });
};
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};	

exports.hasAuthorization = function(req, res, next) {
    console.log(req.transaction.creator.id);
    if (req.transaction.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};