
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require ("querystring");
var commonHeaders = {'Content-Type': 'text/html'}

// 2. Handle the HTTP route GET / (home route - just the main index) and POST / i.e. Home - the incoming message
function homeRoute(request, response){
    
   // If the URL == "/" && its a GET method
   if (request.url ===  "/"){
     if (request.method.toLowerCase() === "get"){
      // show search field
       response.writeHead(200, commonHeaders); // sends a response header to the request with the status code 200 (OK) and the content-type text/html
       renderer.view("header", {}, response); // call the view function in renderer.js with "header" to display the header template
       renderer.view("search", {}, response); // call the view function in renderer.js with "search" to display the search template
       renderer.view("footer", {}, response); // call the view function in renderer.js with "footer" to display the footer template
       response.end(); // end the response

     } else { // If the URL == "/" && POST - ie the form's request
       
       // get the post data from body
       request.on("data", function (postBody){
         // extract the username
          var query = querystring.parse(postBody.toString()); // convert postBody from Buffer to String and then parse the data
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
  var username = request.url.replace("/", ""); // remove the slash at the start to get the username

  if (username.length > 0) {
      response.writeHead(200, commonHeaders); // sends a response header to the request with the status code 200 (OK) and the content-type text/html
      renderer.view("header", {}, response); // call the view function in renderer.js with "header" to display the header template
    
    //get json from Treehouse
    var studentProfile = new Profile(username); // create new Profile object using the username - see profile.js
    
    // on end - When the JSON body is fully recieved the "end" event is triggered and the full body is given to the handler or callback
    studentProfile.on("end", function(profileJSON){ 
      
      // store the values that we need
      var values = {
        avatarUrl: profileJSON.gravatar_url, // note: variable names taken from json page
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      // simple response
      renderer.view("profile", values, response); // call the view function in renderer.js with "profile" and values, to display the retrieved profile info
      renderer.view("footer", {}, response); // call the view function in renderer.js with "footer" to display the footer template
      response.end();
      
    });

     // on "error" - If a parsing, network or HTTP error occurs an error object is passed in to the handler or callback    
    studentProfile.on("error", function(error){
       // show error
       renderer.view("error", {errorMessage: error.message}, response); // call the view function in renderer.js with "error" and the error message
       renderer.view("search", {}, response); // call the view function in renderer.js with "search" to display the search template
       renderer.view("footer", {}, response); // call the view function in renderer.js with "footer" to display the footer template
       response.end();
    });
       
  }
}

// export functions for use outside this file
module.exports.home = homeRoute;
module.exports.user = userRoute;



