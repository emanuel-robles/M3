var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

http.createServer(function(req, res){
    console.log('Esta es la url:', req.url);
    fs.readFile(`./images/${req.url}.jpg`, function(err, data){
        if(err){
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end('Error: image not found')
        } else {
            res.writeHead(200, {'Content-type': 'image/jpeg'});
            res.end(data)
        }
    })


}).listen(1337, '127.0.0.1')

console.log('estoy activo');