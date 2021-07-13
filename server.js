const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "./");
const httpServer = http.createServer((request, response) => {
  if (request.method == "GET") {
    const parsedUrl = url.parse(request.url, true);
    let pathName = parsedUrl.pathname;
    if (pathName.endsWith("/")) pathName = pathName + "/index.html";
    console.log(pathName);
    const responseContentType = getContentType(pathName);
    response.setHeader("Content-Type", responseContentType);
    fs.readFile(`${baseDir}${pathName}`, (error, data) => {
      if (!error) {
        response.writeHead(200);
        response.end(data);
      } else {
        console.log(error);
        response.writeHead(404);
        response.end("404 - File Not Found");
      }
    });
  } else if (request.method == "HEAD") {
    try {
      const parsedUrl = url.parse(request.url, true);
      let pathName = parsedUrl.pathname;
      if (pathName.endsWith("/")) pathName = pathName + "/index.html";
      const stats = fs.statSync(`${baseDir}${pathName}`);
      response.setHeader("Last-Modified", stats.mtime);
      response.writeHead(200);
      response.end("");
    } catch (err) {
      console.log(err);
      response.writeHead(405);
      response.end("");
    }
  } else if (request.method == "POST") {
    var r_data = "";
    request.on("data", function (data) {
      r_data += data;
    });
    request.on("end", function () {
      d = JSON.parse(r_data);
      var password = d.password;
      if (
        password_for_file_saving != "" &&
        password_for_file_saving == password
      ) {
        fs.writeFile(baseDir + "/" + d.path, d.content, function (err) {
          if (err) {
            console.log(err);
            response.writeHead(200);
            response.end(err.toString());
          } else {
            response.writeHead(200);
            response.end("Saved");
          }
        });
      } else {
        response.writeHead(200);
        response.end("Incorrect password");
      }
    });
  } else {
    response.writeHead(405);
    response.end("No permission");
  }
});
const mimeTypes = {
  ".html": "text/html",
  ".jgp": "image/jpeg",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".ico": "image/x-icon",
};
const getContentType = (pathName) => {
  let contentType = "application/octet-stream";
  for (var key in mimeTypes) {
    if (mimeTypes.hasOwnProperty(key)) {
      if (pathName.indexOf(key) > -1) {
        contentType = mimeTypes[key];
      }
    }
  }
  return contentType;
};
var password_for_file_saving = process.env["password_for_file_saving"];
httpServer.listen(process.env.PORT, () => {
  console.log(
    "\x1b[32m%s\x1b[0m",
    `Server is running at http://localhost:${httpServer.address().port}`
  );
});
