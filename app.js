// Problem: We need a simple way to look at a user's Treehouse badge count and JavaScript points from a web browser (vs. console).

// Solution: Use node.js to perform the profile look-ups and serve our templates via HTTP


var router = require("./router.js");


// 1. Create a webserver

var http = require('http');

http.createServer(function (request, response) {
  /*response.writeHead(200, {'Content-Type': 'text/plain'});
  setInterval(function(){
    response.write(new Date() + "\n");
  }, 1000); // every 1 second (1000 ms)
 // response.end('Hello World\n'); */
  //router.loadCSS(request, response);
  router.home(request, response);
  router.user(request,response);
}).listen(4567);

console.log('Server running at http://<workspace-url>/');




