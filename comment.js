// Create web server and load data from json file
// Return the data in JSON format

var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
    if (path == '/comment') {
        fs.readFile(__dirname + '/comment.json', function(err, data) {
            if (err) {
                throw err;
            }
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(data);
            response.end();
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('404 Not Found\n');
        response.end();
    }
});

server.listen(8000);
console.log('Server running at http://localhost:8000/');