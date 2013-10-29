//(function(){
//avoid globals for whatever reason
var list;
function getGist(cb){
	var https = require('https');
	var username = 'willsonsmith';
	//replacea above with username you wish to grab
	var contact = 'willsonsmth@gmail.com';
	//replace above with your email
	var options = {
	'host': 'api.github.com',
	'path': '/users/' + username + '/gists',
	'headers': {

		'User-Agent': 'node-http/0.10.5 (contact ' + willsonsmth@gmail.com + ')'
		//github api requires a user agent
		//contact is provided because we are not authenticated
		//see http://developer.github.com/v3/#user-agent-required
		/*
		"If you are hitting the API without authentication,
		we ask that you add some kind of identification to the UA header value.
		This is so we can contact you if there are problems."
		*/
		}
	};

	callback = function(response) {
	var str = '';
	//set up empty string to receive results

	response.on('data', function (chunk) {
	str += chunk;
	//add response data chunk (github json) to string
	});

	response.on('end', function () {
	//once the connection finishes
		var theList,
			theLength,
			//set up variables to receive response as JSON & get the length
			newObject = [];
			//create array to hold the parts we want

	theList = JSON.parse(str);
	theLength = theList.length;
	//parse the response from github to JSON && get its length(to count)

	for (var i = 0; i < theLength; i++){

		newObject.push({'id': theList[i].id});
		//for each item in github's response, push the gist id to array
		//this is for the embedding



	}

		//console.log(newObject);
		list = JSON.stringify(newObject);
		cb();
		//this is our list of ids to insert in the embedded script

	});
	};

	https.request(options, callback).end();
}

	var http = require('http'),
	port = process.env.PORT || 3000;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  getGist(function(){
  res.end(list);
});

}).listen(process.env.PORT || 3000);
console.log('Server running at http://127.0.0.1:3000/');

//})();
