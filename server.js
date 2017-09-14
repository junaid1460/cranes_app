var http = require('http');
var fs = require('fs');
var url = require('url');
// Create a server
http.createServer( function (request, response) {
// Parse the request containing file name
var pathname = url.parse(request.url).pathname;
if(pathname=="/"||pathname=="/work"||pathname=="/thanks"||pathname=="/cranes"||pathname=="/about"||pathname=="/home"||pathname=="/contact"||pathname=="/gallery"){
  pathname="/index.html";
}
// Print the name of the file for which request is made.
console.log("\nRequest for " + pathname + " received.");

// Read the requested file content from file system
fs.readFile(pathname.substr(1), function (err, data) {
if (err) {
console.log(err);
// HTTP Status: 404 : NOT FOUND
// Content Type: text/plain
response.writeHead(404, {'Content-Type': 'text/html'});
}else{
  var mime='text/html';
  if(pathname.lastIndexOf(".jpg")>=0)
     mime='image/jpeg'
     if(pathname.lastIndexOf(".css")>=0)
        mime='text/css'
        if(pathname.lastIndexOf(".xml")>=0)
           mime='text/xml'

//Page found
// HTTP Status: 200 : OK
// Content Type: text/plain
response.writeHead(200, {'Content-Type': mime});
// Write the content of the file to response body
response.write(data);
console.log("Served :\n"+ pathname);
}
// Send the response body
response.end();
});
}).listen(80);
// Console will print the message
console.log('Server running at http://127.0.0.1:80/\n');
