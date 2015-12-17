
exports.render = function(req, res) {
	res.render('app', {
		title: 'Hello World',
		user: JSON.stringify(req.user)
	});
};