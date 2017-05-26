'use strict';
var request = require('request-promise-native')

module.exports.flip = (event, context, callback) => {
  var queries = ["table+flip", "tableflip", "flipping tables", "table+flipping", "flip+table"]
  var query = Math.floor(Math.random() * (queries.length - 1)) + 1
  var getImage = request.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+queries[query]+"&rating=pg-13").then((response) => {
    var url = JSON.parse(response).data.image_url;
    console.log("Sending image url: " + url)
    response = {
      statusCode: 200,
      body: JSON.stringify({
        response_type: "in_channel",
        attachments: [{image_url: url}]
      })
    };
    callback(null, response);
  }).catch((err) => {
    console.log("Recived error from giphy api: " + err)
    response = {
      statusCode: 500,
      body: "Either I ran out of tables to flip, or something's broken. :-(",
    };
    callback(null, response);
  })
}
