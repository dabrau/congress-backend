var express = require('express');
var app = express();
var http = require('https');


var apiKey = process.env.NYT_CONGRESS_API_KEY

function createOptions(chamber, state) {
	return {
  host: 'api.nytimes.com',
  path: '/svc/politics/v3/us/legislative/congress/113/' + chamber + '/members.json?state=' +  state + '&api-key=' + apiKey
  }
}

app.get('/legislators', function (req, res) {
	var options = createOptions(req.query.chamber, req.query.state);

	var req = http.get(options, function(apiRes) {
	  // Buffer the body entirely for processing as a whole.
	  var bodyChunks = [];
	  apiRes.on('data', function(chunk) {
	    // You can process streamed parts here...
	    bodyChunks.push(chunk);
	  }).on('end', function() {
	    var body = Buffer.concat(bodyChunks);
	    // ...and/or process the entire body here.
	    res.send(body);
	  })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

