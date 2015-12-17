var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TransactionSchema =  new Schema({
	created:{
		type : Date,
		default : Date.now,
		trim :true,
	},
	title :{
		type : String,
		default : '',
		trim :true,
		required: 'Title cannot be blank ' 
	},
	content:{
		type:String,
		default :'',
		trim :true
	},
	creator:{
		type:Schema.ObjectId,
		ref:'User'
	},
	withdrawal:{
		type:Number,
		default :0,
		trim :true,
		required: 'Amount cannot be blank '
	},
	deposit:{
		type:Number,
		default :0,
		trim :true,
		required: 'Amount cannot be blank '
	},
	closingBalance:{
		type:Number,
		default :0,
		trim :true
	}

});
mongoose.model('Transaction',TransactionSchema);