const http = require("http");
let server = http.createServer(function (request, response) {
  let body = "Hello World , Hi How are you ";
  const date = new Date();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  exports.dayofWeek = function () {
    return days[date.getDay() - 1];
  };
  
  response.writeHead(200, {
    "Content-Length": body.length,
    "Content-Type": "text/plain",
  });
  response.end(body);
});
server.listen(8080);
