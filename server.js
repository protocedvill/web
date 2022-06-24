const https = require('https');
const fs = require('fs');
const url = require('url');

const options = {
  key: fs.readFileSync('./cred/key.pem'),
  cert: fs.readFileSync('./cred/cert.pem')
};

https.createServer(options, function (req, res) {
    var filename = "./html/" + url.parse(req.url, true).pathname;
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }  
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}).listen(8000);