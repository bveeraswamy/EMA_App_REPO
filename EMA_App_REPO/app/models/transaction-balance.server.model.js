var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BalanceSchema = new Schema({
	availableBalance:{
		type:Number,
		default :0,
		trim :true
	}

});
mongoose.model('AvailableBalance',BalanceSchema);