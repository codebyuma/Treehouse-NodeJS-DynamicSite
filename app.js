// Problem: We need a simple way to look at a user's Treehouse badge count and JavaScript points from a web browser (vs. console).

// Solution: Use node.js to perform the profile look-ups and serve our templates via HTTP


var router = require("./router.js");


// 1. Create a webserver

var http = require('http');

http.createServer(function (request, response) { // create server and listen at port 4567
  router.home(request, response); // call the the home function in router.js to deal with the home route and display the appropriate page
  router.user(request,response); // call the user function in router.js to get and load the user's information
}).listen(4567);

console.log('Server running at http://<workspace-url>/');




