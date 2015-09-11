// 4. Function that handles the reading of files (templates?) and merge in values into profile.html
  // read from file (html?) and get a string
      // merge values into string

var fs = require("fs"); // import the fs module

function mergeValues(values, content){
  // Cycle over the keys
    for (var key in values) {
    // Replace all {{key}}, as written in the template files,  with the value from the values object
      // remember: values.avatarURL === values["avatarUrl"]
      content = content.replace("{{" + key + "}}", values[key]);
      
    }
  // return merged content
  return content

}

function view (templateName, values, response){
  //Read from the template files
  
  /*fs.readFile('./views/' + templateName + '.html', function (error, fileContents) {
    if (error)
      throw error;
    
    response.write(fileContents);
  });*/
  // we want to actually block and wait for file to be displayed before next steps, so use readfilesync instead of just readfile:
  var fileContents = fs.readFileSync('./views/' + templateName + '.html',{encoding: 'utf8'});
  fileContents = mergeValues(values, fileContents);
  // Insert values into the content
  
  
  
  
  // write out the contents to the response
  response.write(fileContents); 

}

/*function loadStyle (templateName, request, response){
  var styleContents = fs.readFileSync('./views/' + templateName + '.css');
  //fileContents = mergeValues(values, fileContents);
  // Insert values into the content

  // write out the contents to the response
  response.end(styleContents, 'utf-8'); 


}*/

module.exports.view = view;
//module.exports.loadStyle = loadStyle;