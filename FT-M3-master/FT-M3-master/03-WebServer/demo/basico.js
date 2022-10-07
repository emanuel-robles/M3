var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo
var fs = require('fs');
http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
	//Para crear un response empezamos escribiendo el header
	console.log(req.url);

   if(req.url=== '/'){
	res.writeHead(200, { 'Content-Type':'text/plain' }) //Le ponemos el status code y algunos pair-values en el header
	res.end('Hola, Mundo!\n');
   }
   else if(req.url=== '/home'){
	res.writeHead(200, { 'Content-Type':'text/plain' }) 
	let objeto= {
		nombre: 'Emanuel',
		primerapellido: 'Robles',
		segundoapellido: 'Avila',
		rut: 19418077-2
	}
	res.end(JSON.stringify(objeto));
   }
   else if(req.url=== '/html'){
	res.writeHead(200, { 'Content-Type':'text/html' })
	let html = fs.readFileSync(__dirname + '/html/index.html') 
	res.end(html);
	  }
	  else if(req.url=== '/template'){
		res.writeHead(200, { 'Content-Type':'text/html' })
		let html = fs.readFileSync(__dirname + '/html/template.HTML','utf-8')
		let nombre= 'Henry';
		html= html.replace('{nombre}', nombre) 
		res.end(html);
		  }
   
 
 
   else res.writeHead(404, { 'Content-Type':'text/plain' }) 
   res.end('hermanito es un error\n');

	

}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor

//http://localhost:1337
//node module http modulos
//http.createServer