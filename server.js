var express = require('express');
var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/assets'));

app.listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});