var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    response.end(fs.readFileSync('hello.html'));
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");
