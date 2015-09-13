
var fs = require("fs"); // import the fs module

// 4. Function that handles the merges in values into profile.html
function mergeValues(values, content){
  // Cycle over the keys
    for (var key in values) {
    // Replace all {{key}}, as written in the template files,  with the value from the values object
      // remember: values.avatarURL === values["avatarUrl"]
      content = content.replace("{{" + key + "}}", values[key]); // merge values into string
      
    }
  // return merged content
  return content
}

// read in template file, then call mergeValues to replace temp variables with values we've pulled from the JSON, and then write contents to the response to server
function view (templateName, values, response){
  //Read from the template files
  // we want to actually block and wait for file to be displayed before next steps, so use readfilesync instead of just readfile:
  var fileContents = fs.readFileSync('./views/' + templateName + '.html',{encoding: 'utf8'});
  fileContents = mergeValues(values, fileContents);   // Insert values into the content
  response.write(fileContents);  // write out the contents to the response
}

module.exports.view = view; // export function for use outside this file