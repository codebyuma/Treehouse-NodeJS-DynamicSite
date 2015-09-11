var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require ("querystring");
var commonHeaders = {'Content-Type': 'text/html'}

// 2. Handle the HTTP route GET / (home route - just the main index) and POST / i.e. Home - the incoming message
function homeRoute(request, response){
    // If the URL == "/" && GET
   if (request.url ===  "/"){
     if (request.method.toLowerCase() === "get"){
      // show search field
        response.writeHead(200, commonHeaders);
       renderer.view("header", {}, response);
       renderer.view("search", {}, response);
       renderer.view("footer", {}, response);
       response.end();
        /*response.write("Header\n");
        response.write("Search\n");
        response.end("Footer\n");*/
     } else {
        
        // If the URL == "/" && POST
       
       // get the post data from body
       request.on("data", function (postBody){
          //console.log(postBody.toString());
         // extract the username
          var query = querystring.parse(postBody.toString());
          // redirect to  /:username
          response.writeHead(303, {"Location": "/" + query.username}); // 303, "see another location" // could put full URL in, but /username is fine
          response.end();
       });
      
       
       
     }
   }

 
}

// 3. Handle the HTTP route for GET /:username ie. /umachandran or /chalkers

function userRoute(request, response){
 
  // if URL == "/...."
  var username = request.url.replace("/", ""); // remove the slash at the start
  if (username.length > 0) {
        response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
    
    //get json from Treehouse
    var studentProfile = new Profile(username);
    // on end
    /**
      * When the JSON body is fully recieved the 
      * the "end" event is triggered and the full body
      * is given to the handler or callback
      **/
      studentProfile.on("end", function(profileJSON){ // make sure you capitalize JSON to be consistent with var name!
        // show profile
        
        // store the values that we need
        var values = {
          avatarUrl: profileJSON.gravatar_url, // var name taken from json page
          username: profileJSON.profile_name,
          badges: profileJSON.badges.length,
          javascriptPoints: profileJSON.points.JavaScript
        }
        // simple response
        renderer.view("profile", values, response);
        //  response.write(values.username + " has " + values.badges + " badges\n");
          //response.end("Footer\n");
        renderer.view("footer", {}, response);
        response.end();
        
      });

     // on "error"
      /**
* If a parsing, network or HTTP error occurs an
* error object is passed in to the handler or callback
**/      
     studentProfile.on("error", function(error){
       // show error
       renderer.view("error", {errorMessage: error.message}, response);
       renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
       response.end();
     });
       
  }
}

/*function loadCSS(request, response) {
    //if (request.url.indexOf('.css') != -1) {
        response.writeHead(200, {'Content-Type': 'text/css'});
       // renderer.contentType('/views/styles.css', request, response);
  renderer.loadStyle('styles', request, response);
        response.end();
    //}
}
*/
/*function root(request, response) {
    if(request.url == "/") {
        response.writeHead(200, {'Content-type': "text/plain"});
        response.end("Home\n");
    }
}

function about(request, response) {
  if (request.url == "/about") {
    response.writeHead(200, {'Content-type': "text/plain"});
    response.end("About\n");
  }
}

function contact(request, response) {
    if(request.url == "/contact") {
        response.writeHead(200, {'Content-type': "text/plain"});
        response.end("Contact\n");
    }
}

module.exports.contact = contact;
module.exports.about = about;
module.exports.root = root;*/


module.exports.home = homeRoute;
module.exports.user = userRoute;
//module.exports.loadCSS = loadCSS;



