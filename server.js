//require dependecies
var 
	express = require('express'),
	bodyParser = require('body-parser');

var app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(__dirname))

app.get('/', (req,res) => {
		res.send('index.html');
});

app.use('/:date', (req,res) => {
	query = req.params.date
	res.send(parseDate(query)); 
});

function parseDate (query) {
	console.log(query)
	if(query === query.match(/[0-9]+/)[0]) {
		num = parseInt(query, 10);
		return dateObj(num,(new Date(num * 1000)).toDateString());
	}
	else if(query.match(/[a-zA-z]+\s[0-9]{2},\s[0-9]{4}/)) {
		date = new Date(query)
		return dateObj(Math.round(date.getTime()/1000),query);
	}
	else {
		return dateObj(null,null);
	}
}

function dateObj (unix, natDate) {
	return {"unix": unix, "natural": natDate};
}

app.listen(8080);
