var mongoose = require('mongoose');

mongoose
	.connect(
	'mongodb://mongo:27017/mydb',
	 { useNewUrlParser: true }
	 )
	 .then(() => console.log('MongoDB Connected'))
	 .catch(err => console.log(err));